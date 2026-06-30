from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
from app.config import get_settings

settings = get_settings()

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

@router.post("")
async def chat_with_planner(request: ChatRequest):
    if not settings.gemini_api_key:
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

        return {"response": response.text}

    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")
