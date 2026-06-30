from fastapi import APIRouter

from app.api.v1 import auth, destinations, adventures, operators, bookings, dashboard

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(destinations.router, prefix="/destinations", tags=["destinations"])
api_router.include_router(adventures.router, prefix="/adventures", tags=["adventures"])
api_router.include_router(operators.router)
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
