import os
import sys
from sqlalchemy import create_engine, text

# Add parent directory to path so we can import app config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.config import get_settings

def main():
    settings = get_settings()
    if not settings.database_url:
        print("DATABASE_URL is not set.")
        return
        
    db_url = settings.database_url.replace("+asyncpg", "+psycopg")
    print(f"Connecting to database...")
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        print("Adding gallery_urls column to adventures table...")
        try:
            conn.execute(text("ALTER TABLE adventures ADD COLUMN gallery_urls JSONB DEFAULT '[]'::jsonb;"))
            conn.commit()
            print("Successfully added gallery_urls column.")
        except Exception as e:
            if "already exists" in str(e):
                print("Column gallery_urls already exists.")
            else:
                print(f"Error: {e}")

if __name__ == "__main__":
    main()
