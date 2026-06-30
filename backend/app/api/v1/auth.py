from datetime import UTC, datetime

from fastapi import APIRouter, status

from app.dependencies import DbSession, CurrentUser
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest
from app.services.auth_service import AuthService
from app.models.user import UserStatus, UserRole

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: DbSession) -> AuthResponse:
    return await AuthService(db).register(data)


@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, db: DbSession) -> AuthResponse:
    return await AuthService(db).login(data)


@router.get("/me")
async def get_me(user: CurrentUser):
    # Returns the user from the database, giving us their real status and role
    return {
        "id": str(user.id),
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "status": user.status
    }


@router.get("/health")
async def auth_health() -> dict[str, str]:
    return {"status": "ok", "timestamp": datetime.now(UTC).isoformat()}
