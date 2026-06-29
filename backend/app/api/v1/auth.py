from datetime import UTC, datetime

from fastapi import APIRouter, status

from app.dependencies import DbSession
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: DbSession) -> AuthResponse:
    return await AuthService(db).register(data)


@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, db: DbSession) -> AuthResponse:
    return await AuthService(db).login(data)


@router.get("/health")
async def auth_health() -> dict[str, str]:
    return {"status": "ok", "timestamp": datetime.now(UTC).isoformat()}
