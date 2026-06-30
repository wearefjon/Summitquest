from pydantic import BaseModel
from typing import List, Optional
from app.schemas.booking import BookingResponse

class CustomerDashboardResponse(BaseModel):
    upcoming_bookings: List[BookingResponse]
    past_bookings: List[BookingResponse]
    
class OperatorAnalytics(BaseModel):
    total_revenue: float
    active_bookings: int
    total_adventures: int

class OperatorDashboardResponse(BaseModel):
    analytics: OperatorAnalytics
    recent_bookings: List[BookingResponse]
