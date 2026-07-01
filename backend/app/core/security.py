from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import UUID

import jwt
from jwt.exceptions import PyJWTError
from passlib.context import CryptContext

from app.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str | UUID, extra_claims: dict[str, Any] | None = None) -> str:
    expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)
    payload: dict[str, Any] = {
        "sub": str(subject),
        "exp": expire,
        "type": "access",
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.secret_key, algorithm=settings.jwt_algorithm)


def create_refresh_token(subject: str | UUID) -> str:
    expire = datetime.now(UTC) + timedelta(days=settings.refresh_token_expire_days)
    payload = {
        "sub": str(subject),
        "exp": expire,
        "type": "refresh",
    }
    return jwt.encode(payload, settings.secret_key, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict[str, Any]:
    try:
        # Supabase JWTs use the HS256 algorithm and the project's JWT_SECRET
        unverified_header = jwt.get_unverified_header(token)
        alg = unverified_header.get("alg", "HS256")
        
        import structlog
        structlog.get_logger().info("jwt_alg_check", alg=alg)
        
        return jwt.decode(
            token, 
            settings.secret_key, 
            algorithms=[alg] if alg != "none" else ["HS256"],
            options={"verify_aud": False}
        )
    except PyJWTError as exc:
        import structlog
        structlog.get_logger().error("jwt_decode_error", error=str(exc), type=type(exc).__name__)
        raise ValueError("Invalid token") from exc
