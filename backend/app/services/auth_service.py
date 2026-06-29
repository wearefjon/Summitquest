from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import AuthenticationError, ConflictError
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.models.user import User, UserRole, UserStatus
from app.repositories.user_repo import UserRepository
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest, UserAuthResponse


class AuthService:
    def __init__(self, db: AsyncSession) -> None:
        self._user_repo = UserRepository(db)

    async def register(self, data: RegisterRequest) -> AuthResponse:
        existing = await self._user_repo.get_by_email(data.email)
        if existing:
            raise ConflictError("Email already registered")

        role = UserRole.OPERATOR if data.role == "operator" else UserRole.CUSTOMER
        status = UserStatus.PENDING if role == UserRole.OPERATOR else UserStatus.ACTIVE

        user = User(
            email=data.email.lower(),
            hashed_password=hash_password(data.password),
            full_name=data.full_name,
            phone=data.phone,
            role=role,
            status=status,
            email_verified=False,
        )
        user = await self._user_repo.create(user)
        return self._build_auth_response(user)

    async def login(self, data: LoginRequest) -> AuthResponse:
        user = await self._user_repo.get_by_email(data.email)
        if not user or not user.hashed_password:
            raise AuthenticationError("Invalid email or password")
        if not verify_password(data.password, user.hashed_password):
            raise AuthenticationError("Invalid email or password")
        if user.status == UserStatus.SUSPENDED:
            raise AuthenticationError("Account suspended")
        if user.status == UserStatus.DEACTIVATED:
            raise AuthenticationError("Account deactivated")

        return self._build_auth_response(user)

    def _build_auth_response(self, user: User) -> AuthResponse:
        claims = {"role": user.role.value, "email": user.email}
        return AuthResponse(
            access_token=create_access_token(user.id, claims),
            refresh_token=create_refresh_token(user.id),
            user=UserAuthResponse(
                id=str(user.id),
                email=user.email,
                full_name=user.full_name,
                role=user.role.value,
                status=user.status.value,
                email_verified=user.email_verified,
            ),
        )
