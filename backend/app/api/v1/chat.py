from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import google.generativeai as genai
import structlog
import time
from app.config import get_settings
from app.dependencies import get_current_user
from app.models.user import User

settings = get_settings()
logger = structlog.get_logger()

router = APIRouter()

class ChatMessage(BaseModel):
    role: str # "user" or "model"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

# Configure Gemini
if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)

SYSTEM_PROMPT = """
You are the SummitQuest AI Adventure Planner. 
Your goal is to help travelers discover the perfect trekking and adventure destinations in Maharashtra (such as Lonavala, Kolad, Bhandardara, Matheran, Kalsubai, and Tarkarli).
You are enthusiastic, knowledgeable, and concise. 
If someone asks about booking, tell them to sign in or create an account, then browse the "Adventures" or "Destinations" pages. 
Keep your responses relatively brief (1-3 short paragraphs) and formatted nicely with markdown if appropriate. 
Never break character.
"""

# Simple in-memory rate limiter: {user_id: [timestamp1, timestamp2, ...]}
RATE_LIMIT_WINDOW = 60 # seconds
MAX_REQUESTS_PER_WINDOW = 5
user_requests = {}

CurrentUser = Annotated[User, Depends(get_current_user)]

@router.post("")
async def chat_with_planner(request: ChatRequest, current_user: CurrentUser):
    # Rate limiting check
    now = time.time()
    user_times = user_requests.get(current_user.id, [])
    user_times = [t for t in user_times if now - t < RATE_LIMIT_WINDOW]
    
    if len(user_times) >= MAX_REQUESTS_PER_WINDOW:
        logger.warning("chat_rate_limit_exceeded", user_id=current_user.id)
        raise HTTPException(status_code=429, detail="Too many requests. Please wait a minute.")
        
    user_times.append(now)
    user_requests[current_user.id] = user_times

    if not settings.gemini_api_key:
        logger.error("chat_error", error="Gemini API Key is not configured.")
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured.")

    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )

        # Convert our simplified messages to the format expected by Gemini
        formatted_messages = []
        for msg in request.messages:
            # Gemini expects 'user' or 'model'
            role = "model" if msg.role == "assistant" else "user"
            formatted_messages.append({
                "role": role,
                "parts": [msg.content]
            })

        response = model.generate_content(
            formatted_messages,
            generation_config=genai.types.GenerationConfig(
                temperature=0.7,
            )
        )

        logger.info("chat_request_processed", user_id=current_user.id, messages_count=len(request.messages))
        return {"response": response.text}

    except Exception as e:
        logger.error("chat_error", error=str(e), user_id=current_user.id)
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")
