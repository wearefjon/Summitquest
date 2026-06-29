from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

class DestinationBase(BaseModel):
    slug: str
    title: str
    short_description: str
    description: str
    image_url: str
    tag: str
    tourist_centers: list[str] | None = None

class DestinationCreate(DestinationBase):
    pass

class DestinationResponse(DestinationBase):
    id: str
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
