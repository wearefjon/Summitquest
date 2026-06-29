from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.operator import Operator
from app.schemas.operator import OperatorResponse

router = APIRouter(prefix="/operators", tags=["Operators"])

@router.get("", response_model=list[OperatorResponse])
async def get_operators(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Operator))
    return result.scalars().all()

@router.get("/{operator_id}", response_model=OperatorResponse)
async def get_operator_by_id(operator_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Operator).where(Operator.id == operator_id))
    operator = result.scalar_one_or_none()
    if not operator:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Operator with ID '{operator_id}' not found"
        )
    return operator
