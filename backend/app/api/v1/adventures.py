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

from app.schemas.adventure import AdventureCreate
from app.dependencies import get_current_user
from app.models.user import User, UserStatus

@router.post("", response_model=AdventureResponse, status_code=status.HTTP_201_CREATED)
async def create_adventure(
    adventure_in: AdventureCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != "operator":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    if current_user.status != UserStatus.ACTIVE:
        raise HTTPException(status_code=403, detail="Your operator account is pending approval.")
        
    db_adventure = Adventure(
        id=str(uuid.uuid4()),
        slug=adventure_in.slug,
        title=adventure_in.title,
        short_description=adventure_in.short_description,
        description=adventure_in.description,
        activity_type=adventure_in.activity_type,
        difficulty=adventure_in.difficulty,
        duration_days=adventure_in.duration_days,
        price=adventure_in.price,
        image_url=adventure_in.image_url,
        destination_id=adventure_in.destination_id,
        operator_id=current_user.id
    )
    
    db.add(db_adventure)
    await db.commit()
    await db.refresh(db_adventure)
    return db_adventure
