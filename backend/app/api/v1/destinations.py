from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.destination import Destination
from app.schemas.destination import DestinationResponse

router = APIRouter(prefix="/destinations", tags=["Destinations"])

@router.get("", response_model=list[DestinationResponse])
async def get_destinations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Destination))
    return result.scalars().all()

@router.get("/{slug}", response_model=DestinationResponse)
async def get_destination_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Destination).where(Destination.slug == slug))
    destination = result.scalar_one_or_none()
    if not destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Destination with slug '{slug}' not found"
        )
    return destination
