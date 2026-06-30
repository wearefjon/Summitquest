from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from typing import Any

from app.database import get_db
from app.models.booking import Booking, BookingStatus
from app.models.adventure import Adventure
from app.schemas.dashboard import CustomerDashboardResponse, OperatorDashboardResponse, OperatorAnalytics
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/customer", response_model=CustomerDashboardResponse)
async def get_customer_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    # Get all bookings for the customer
    result = await db.execute(
        select(Booking)
        .where(Booking.user_id == current_user.id)
        .order_by(Booking.booking_date.desc())
    )
    bookings = result.scalars().all()
    
    # For a real app, you would filter by date > now() for upcoming. 
    # For now, we split by status for simplicity: Confirmed/Pending = upcoming, Completed/Cancelled = past
    upcoming = [b for b in bookings if b.status in [BookingStatus.CONFIRMED, BookingStatus.PENDING]]
    past = [b for b in bookings if b.status in [BookingStatus.COMPLETED, BookingStatus.CANCELLED]]
    
    return CustomerDashboardResponse(
        upcoming_bookings=upcoming,
        past_bookings=past
    )

@router.get("/operator", response_model=OperatorDashboardResponse)
async def get_operator_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    if current_user.role != "operator":
        raise HTTPException(status_code=403, detail="Not authorized as operator")
        
    # Operator dashboard logic:
    # 1. Find all adventures owned by this operator
    adventures_result = await db.execute(
        select(Adventure).where(Adventure.operator_id == current_user.id)
    )
    adventures = adventures_result.scalars().all()
    adventure_ids = [a.id for a in adventures]
    
    if not adventure_ids:
        return OperatorDashboardResponse(
            analytics=OperatorAnalytics(total_revenue=0, active_bookings=0, total_adventures=0),
            recent_bookings=[]
        )
        
    # 2. Get all bookings for these adventures
    bookings_result = await db.execute(
        select(Booking)
        .where(Booking.adventure_id.in_(adventure_ids))
        .order_by(Booking.created_at.desc())
    )
    bookings = bookings_result.scalars().all()
    
    # 3. Calculate metrics
    active_bookings = sum(1 for b in bookings if b.status == BookingStatus.CONFIRMED)
    total_revenue = sum(b.total_price for b in bookings if b.status == BookingStatus.CONFIRMED)
    recent = bookings[:5] # Top 5 recent
    
    return OperatorDashboardResponse(
        analytics=OperatorAnalytics(
            total_revenue=total_revenue,
            active_bookings=active_bookings,
            total_adventures=len(adventures)
        ),
        recent_bookings=recent
    )
