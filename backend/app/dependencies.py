from typing import Annotated
from uuid import UUID

from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import AuthenticationError, AuthorizationError
from app.core.security import decode_token
from app.database import get_db
from app.models.user import User, UserRole
from app.repositories.user_repo import UserRepository

DbSession = Annotated[AsyncSession, Depends(get_db)]


async def get_current_user(
    db: DbSession,
    authorization: Annotated[str | None, Header()] = None,
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise AuthenticationError("Missing or invalid authorization header")

    token = authorization.removeprefix("Bearer ").strip()
    try:
        payload = decode_token(token)
    except ValueError as exc:
        raise AuthenticationError("Invalid or expired token") from exc

    user_id = payload.get("sub")
    if not user_id:
        raise AuthenticationError("Invalid token payload")

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(UUID(user_id))
    
    # Lazy creation: if user doesn't exist in our DB, create them
    if not user:
        email = payload.get("email") or ""
        user_metadata = payload.get("user_metadata", {})
        
        # We can extract name from standard metadata fields
        full_name = user_metadata.get("full_name") or user_metadata.get("name") or email.split("@")[0] or "User"
        
        # We map string roles from metadata to our enum
        role_str = user_metadata.get("role", "customer")
        role = UserRole.OPERATOR if role_str == "operator" else UserRole.CUSTOMER
        
        try:
            # Create user with a dummy password since Supabase handles actual auth
            new_user = User(
                id=UUID(user_id),
                email=email,
                password_hash="supabase_auth",
                full_name=full_name,
                role=role
            )
            user = await user_repo.create(new_user)
            
            # If they are an operator, we must also create their Operator profile
            if role == UserRole.OPERATOR:
                from app.models.operator import Operator
                new_operator = Operator(
                    id=str(user.id),
                    name=full_name,
                    description="New operator profile",
                    is_verified=False
                )
                db.add(new_operator)
                await db.commit()
                
        except Exception as exc:
            import structlog
            structlog.get_logger().error("lazy_user_creation_failed", error=str(exc))
            raise AuthenticationError("Failed to initialize user session") from exc

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def require_roles(*roles: UserRole):
    async def role_checker(user: CurrentUser) -> User:
        if user.role not in roles:
            raise AuthorizationError("Insufficient permissions")
        return user

    return role_checker
