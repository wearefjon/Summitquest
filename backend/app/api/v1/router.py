from fastapi import APIRouter

from app.api.v1 import admin, destinations, adventures, operators, bookings, dashboard, payments, auth

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(destinations.router)
api_router.include_router(adventures.router)
api_router.include_router(operators.router)
api_router.include_router(bookings.router)
api_router.include_router(dashboard.router)
api_router.include_router(admin.router)
api_router.include_router(payments.router)
