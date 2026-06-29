from datetime import datetime
import uuid
from sqlalchemy import String, Text, DateTime, Float, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.database import Base

class Operator(Base):
    __tablename__ = "operators"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    
    avatar_url: Mapped[str] = mapped_column(String(1024), nullable=True)
    cover_image_url: Mapped[str] = mapped_column(String(1024), nullable=True)
    
    rating: Mapped[float] = mapped_column(Float, default=0.0)
    review_count: Mapped[int] = mapped_column(Integer, default=0)
    
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    member_since: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    
    # Contact info
    location: Mapped[str] = mapped_column(String(255), nullable=True)
    
    # Relationships
    adventures = relationship("Adventure", back_populates="operator")
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), onupdate=func.now(), nullable=True)
