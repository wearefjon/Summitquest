from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

class BookingBase(BaseModel):
    adventure_id: str = Field(..., max_length=36)
    booking_date: datetime
    guests: int = Field(default=1, ge=1, le=50)

class BookingCreate(BookingBase):
    pass

class BookingResponse(BookingBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    total_price: float
    status: str
    payment_reference: str | None
    created_at: datetime
    updated_at: datetime
