import stripe
import os
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Request, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.adventure import Adventure
from app.models.booking import Booking
from app.services.email import send_booking_confirmation

from app.config import get_settings

router = APIRouter(prefix="/payments", tags=["payments"])

settings = get_settings()
stripe.api_key = settings.stripe_secret_key
STRIPE_WEBHOOK_SECRET = settings.stripe_webhook_secret
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

DbSession = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

@router.post("/create-checkout-session")
async def create_checkout_session(
    adventure_id: str,
    travelers: int,
    db: DbSession,
    current_user: CurrentUser
):
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe is not configured.")

    # 1. Fetch Adventure
    result = await db.execute(select(Adventure).where(Adventure.id == adventure_id))
    adventure = result.scalar_one_or_none()
    if not adventure:
        raise HTTPException(status_code=404, detail="Adventure not found")

    if adventure.status != "published":
        raise HTTPException(status_code=400, detail="Adventure is not available for booking")

    # 2. Calculate Total Price
    total_price = adventure.price * travelers

    # 3. Create a pending booking record in our DB
    booking = Booking(
        user_id=current_user.id,
        adventure_id=adventure_id,
        travelers=travelers,
        total_price=total_price,
        status="pending"
    )
    db.add(booking)
    await db.commit()
    await db.refresh(booking)

    # 4. Create Stripe Checkout Session
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            customer_email=current_user.email,
            line_items=[
                {
                    'price_data': {
                        'currency': 'inr',
                        'unit_amount': int(adventure.price * 100), # Stripe uses paise/cents
                        'product_data': {
                            'name': adventure.title,
                            'description': adventure.short_description,
                        },
                    },
                    'quantity': travelers,
                },
            ],
            mode='payment',
            success_url=f"{FRONTEND_URL}/customer/bookings?success=true&booking_id={booking.id}",
            cancel_url=f"{FRONTEND_URL}/adventures/{adventure_id}?canceled=true",
            metadata={
                'booking_id': booking.id,
                'user_id': current_user.id,
                'adventure_id': adventure_id
            }
        )
        return {"id": checkout_session.id, "url": checkout_session.url}
    except Exception as e:
        # Revert pending booking if stripe fails
        await db.delete(booking)
        await db.commit()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: Annotated[str | None, Header()] = None, db: AsyncSession = Depends(get_db)):
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=500, detail="Webhook secret not configured")

    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        booking_id = session.get('metadata', {}).get('booking_id')
        
        if booking_id:
            # Update booking status to confirmed
            result = await db.execute(
                select(Booking, Adventure, User)
                .join(Adventure, Booking.adventure_id == Adventure.id)
                .join(User, Booking.user_id == User.id)
                .where(Booking.id == booking_id)
            )
            row = result.first()
            if row:
                booking, adventure, user = row
                booking.status = "confirmed"
                await db.commit()
                
                # Trigger EmailJS Booking Success Email
                await send_booking_confirmation(
                    customer_email=user.email,
                    customer_name=user.full_name or "Adventurer",
                    tour_name=adventure.title,
                    tour_date="Contact Operator", # Add real date if we had a start_date column
                    travelers=booking.travelers,
                    total_paid=booking.total_price,
                    booking_id=booking.id
                )
                
    return {"status": "success"}
