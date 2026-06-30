import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.dependencies import DbSession, CurrentUser
from app.models.booking import Booking, BookingStatus
from app.models.adventure import Adventure
from app.schemas.booking import BookingCreate, BookingResponse

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    data: BookingCreate,
    db: DbSession,
    user: CurrentUser,
) -> Booking:
    # Verify adventure exists
    stmt = select(Adventure).where(Adventure.id == data.adventure_id)
    result = await db.execute(stmt)
    adventure = result.scalar_one_or_none()
    
    if not adventure:
        raise HTTPException(status_code=404, detail="Adventure not found")
        
    total_price = adventure.price * data.guests
    
    booking = Booking(
        user_id=user.id,
        adventure_id=adventure.id,
        booking_date=data.booking_date,
        guests=data.guests,
        total_price=total_price,
        status=BookingStatus.PENDING
    )
    
    db.add(booking)
    await db.commit()
    await db.refresh(booking)
    
    return booking

@router.get("/me", response_model=List[BookingResponse])
async def get_my_bookings(
    db: DbSession,
    user: CurrentUser,
) -> List[Booking]:
    stmt = select(Booking).where(Booking.user_id == user.id).order_by(Booking.created_at.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())

@router.post("/{booking_id}/confirm", response_model=BookingResponse)
async def confirm_booking(
    booking_id: uuid.UUID,
    db: DbSession,
    user: CurrentUser,
) -> Booking:
    stmt = select(Booking).where(Booking.id == booking_id, Booking.user_id == user.id)
    result = await db.execute(stmt)
    booking = result.scalar_one_or_none()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    booking.status = BookingStatus.CONFIRMED
    booking.payment_reference = f"pi_mock_{uuid.uuid4().hex[:16]}"
    
    await db.commit()
    await db.refresh(booking)
    
    return booking
