from typing import List, Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User, UserRole, UserStatus
from app.models.operator import Operator
from app.models.adventure import Adventure
from app.models.booking import Booking

router = APIRouter()
DbSession = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

async def require_admin(user: CurrentUser) -> User:
    """
    Security Note: We raise 404 Not Found instead of 401/403 for unauthorized users
    to prevent route discovery (e.g. by Gobuster).
    """
    if user.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")
    return user

AdminUser = Annotated[User, Depends(require_admin)]

@router.get("/stats")
async def get_admin_stats(db: DbSession, admin: AdminUser):
    # Total Users
    users_result = await db.execute(select(func.count()).select_from(User))
    total_users = users_result.scalar_one()

    # Total Operators
    operators_result = await db.execute(select(func.count()).select_from(Operator))
    total_operators = operators_result.scalar_one()

    # Total Bookings (Confirmed)
    bookings_result = await db.execute(select(func.count()).select_from(Booking).where(Booking.status == 'confirmed'))
    total_bookings = bookings_result.scalar_one()

    # Total Revenue (Confirmed Bookings)
    revenue_result = await db.execute(select(func.sum(Booking.total_price)).select_from(Booking).where(Booking.status == 'confirmed'))
    total_revenue = revenue_result.scalar_one() or 0.0

    return {
        "total_users": total_users,
        "total_operators": total_operators,
        "total_active_bookings": total_bookings,
        "total_revenue": total_revenue
    }

@router.get("/users")
async def get_users(db: DbSession, admin: AdminUser):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    return users

@router.get("/operators")
async def get_operators(db: DbSession, admin: AdminUser):
    result = await db.execute(select(Operator).order_by(Operator.created_at.desc()))
    operators = result.scalars().all()
    return operators

@router.put("/operators/{operator_id}/verify")
async def verify_operator(operator_id: str, db: DbSession, admin: AdminUser):
    result = await db.execute(select(Operator).where(Operator.id == operator_id))
    operator = result.scalar_one_or_none()
    if not operator:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Operator not found")
    
    operator.is_verified = not operator.is_verified
    await db.commit()
    return operator

@router.get("/adventures")
async def get_adventures(db: DbSession, admin: AdminUser):
    result = await db.execute(select(Adventure).order_by(Adventure.created_at.desc()))
    adventures = result.scalars().all()
    return adventures

@router.put("/adventures/{adventure_id}/status")
async def update_adventure_status(adventure_id: str, new_status: str, db: DbSession, admin: AdminUser):
    result = await db.execute(select(Adventure).where(Adventure.id == adventure_id))
    adventure = result.scalar_one_or_none()
    if not adventure:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Adventure not found")
    
    if new_status not in ["pending", "published", "rejected"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid status")

    adventure.status = new_status
    await db.commit()
    return adventure
