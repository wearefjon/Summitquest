import asyncio
import sys

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from app.database import engine
from sqlalchemy import text

async def run_migrations():
    async with engine.begin() as conn:
        try:
            await conn.execute(text("ALTER TABLE operators ADD COLUMN commission_rate FLOAT DEFAULT 0.1;"))
            print("Added commission_rate to operators")
        except Exception as e:
            print("commission_rate might already exist:", e)
            
        try:
            await conn.execute(text("ALTER TABLE adventures ADD COLUMN status VARCHAR(50) DEFAULT 'published';"))
            print("Added status to adventures")
        except Exception as e:
            print("status might already exist:", e)

if __name__ == "__main__":
    asyncio.run(run_migrations())
