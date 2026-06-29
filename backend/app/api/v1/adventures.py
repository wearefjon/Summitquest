from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.database import get_db
from app.models.adventure import Adventure
from app.schemas.adventure import AdventureResponse

router = APIRouter(prefix="/adventures", tags=["Adventures"])

@router.get("", response_model=list[AdventureResponse])
async def get_adventures(
    activity_type: Optional[str] = Query(None, description="Filter by activity type (e.g. Trekking)"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty (e.g. Hard)"),
    min_duration: Optional[int] = Query(None, description="Minimum duration in days"),
    max_duration: Optional[int] = Query(None, description="Maximum duration in days"),
    destination_id: Optional[str] = Query(None, description="Filter by destination ID"),
    q: Optional[str] = Query(None, description="Search term for title or description"),
    db: AsyncSession = Depends(get_db)
):
    query = select(Adventure)
    
    if q:
        search_term = f"%{q}%"
        query = query.where(Adventure.title.ilike(search_term) | Adventure.short_description.ilike(search_term))
    if activity_type:
        query = query.where(Adventure.activity_type == activity_type)
    if difficulty:
        query = query.where(Adventure.difficulty == difficulty)
    if min_duration is not None:
        query = query.where(Adventure.duration_days >= min_duration)
    if max_duration is not None:
        query = query.where(Adventure.duration_days <= max_duration)
    if destination_id:
        query = query.where(Adventure.destination_id == destination_id)
        
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{slug}", response_model=AdventureResponse)
async def get_adventure_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Adventure).where(Adventure.slug == slug))
    adventure = result.scalar_one_or_none()
    if not adventure:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Adventure with slug '{slug}' not found"
        )
    return adventure
