from fastapi import APIRouter

from app.api.v1 import admin, destinations, adventures, operators, bookings, dashboard, payments

api_router = APIRouter()
api_router.include_router(destinations.router, prefix="/destinations", tags=["destinations"])
api_router.include_router(adventures.router, prefix="/adventures", tags=["adventures"])
api_router.include_router(operators.router)
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
