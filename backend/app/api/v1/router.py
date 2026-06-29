from fastapi import APIRouter

from app.api.v1 import auth, destinations, adventures, operators

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(destinations.router)
api_router.include_router(adventures.router)
api_router.include_router(operators.router)
