from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class OperatorBase(BaseModel):
    name: str
    description: str
    avatar_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    location: Optional[str] = None

class OperatorCreate(OperatorBase):
    pass

class OperatorResponse(OperatorBase):
    id: str
    rating: float
    review_count: int
    is_verified: bool
    member_since: datetime
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
