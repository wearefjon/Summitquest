from datetime import datetime
import uuid
from sqlalchemy import String, Text, DateTime, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.database import Base

class Adventure(Base):
    __tablename__ = "adventures"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    short_description: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    
    activity_type: Mapped[str] = mapped_column(String(50), nullable=False) # Trekking, Camping, Water Sports, etc.
    difficulty: Mapped[str] = mapped_column(String(50), nullable=False) # Easy, Moderate, Hard, Extreme
    duration_days: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    
    image_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    
    destination_id: Mapped[str] = mapped_column(String(36), ForeignKey("destinations.id"), nullable=False)
    operator_id: Mapped[str] = mapped_column(String(36), ForeignKey("operators.id"), nullable=True) # Making it true for existing seed data, ideally False
    
    # Relationships
    operator = relationship("Operator", back_populates="adventures")
    # destination = relationship("Destination", back_populates="adventures")
    bookings = relationship("Booking", back_populates="adventure")
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), onupdate=func.now(), nullable=True)
