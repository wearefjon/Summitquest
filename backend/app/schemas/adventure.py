from datetime import datetime
from pydantic import BaseModel, ConfigDict

class AdventureBase(BaseModel):
    slug: str
    title: str
    short_description: str
    description: str
    activity_type: str
    difficulty: str
    duration_days: int
    price: float
    image_url: str
    destination_id: str
    operator_id: str | None = None

class AdventureCreate(AdventureBase):
    pass

class AdventureResponse(AdventureBase):
    id: str
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
