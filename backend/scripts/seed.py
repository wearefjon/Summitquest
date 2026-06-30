import asyncio
import sys
from pathlib import Path
from sqlalchemy import select

# Fix for Windows asyncio event loop policy with psycopg
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Add backend directory to Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.database import engine, Base
from app.models.destination import Destination
from app.models.adventure import Adventure
from app.models.operator import Operator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def seed_data():
    # Ensure tables exist
    async with engine.begin() as conn:
        import app.models.destination
        import app.models.adventure
        import app.models.operator
        import app.models.user
        import app.models.booking
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        print("Database tables ensured.")

    destinations_data = [
        {
            "slug": "lonavala",
            "title": "Lonavala",
            "short_description": "Verdant valleys & cascading waterfalls",
            "description": "Lonavala is a popular hill station close to Pune and Mumbai. It offers stunning vistas of the Western Ghats, ancient forts, and is especially vibrant during the monsoons when countless waterfalls come alive.",
            "image_url": "https://images.unsplash.com/photo-1596884102905-24c65e8ec2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "tag": "Monsoon Special",
            "tourist_centers": ["Bhushi Dam", "Tiger's Leap & Lion's Point", "Rajmachi Fort", "Pawna Lake", "Karla & Bhaja Caves"]
        },
        {
            "slug": "malshej-ghat",
            "title": "Malshej Ghat",
            "short_description": "Dramatic cliffs & avian wildlife",
            "description": "A haven for nature lovers and trekkers, Malshej Ghat is known for its rugged mountains, historic forts, and migratory flamingos. It's an ideal destination for those seeking a dramatic natural landscape.",
            "image_url": "https://images.unsplash.com/photo-1629853974441-2b04f7bf5b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "tag": "Rugged Terrain",
            "tourist_centers": ["Pimpalgaon Joga Dam", "Harishchandragad Fort", "Malshej Falls", "Ajoba Hill Fort", "Kalu Waterfall"]
        },
        {
            "slug": "mahabaleshwar",
            "title": "Mahabaleshwar",
            "short_description": "Expansive plateaus & strawberry trails",
            "description": "Mahabaleshwar features sweeping views, pleasant weather, and lush strawberry farms. It's a classic getaway offering a blend of leisure, scenic viewpoints, and heritage.",
            "image_url": "https://images.unsplash.com/photo-1598091383021-14374b5c77e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "tag": "Leisure Escapes",
            "tourist_centers": ["Venna Lake", "Arthur's Seat", "Pratapgarh Fort", "Wilson Point (Sunrise Point)", "Mapro Garden", "Elephant's Head Point"]
        }
    ]

    operators_data = [
        {
            "id": "op-1", # Manual ID for mapping
            "name": "Sahyadri Rangers",
            "description": "Expert local guides specializing in high-altitude treks and historic fort expeditions across the Western Ghats.",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            "cover_image_url": "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "rating": 4.9,
            "review_count": 128,
            "is_verified": True,
            "location": "Pune, Maharashtra"
        },
        {
            "id": "op-2",
            "name": "Lakeside Campers",
            "description": "Premium lakeside camping experiences with BBQ, music, and stargazing.",
            "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            "cover_image_url": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "rating": 4.7,
            "review_count": 85,
            "is_verified": True,
            "location": "Lonavala, Maharashtra"
        },
        {
            "id": "op-3",
            "name": "Heritage Homes",
            "description": "Authentic rural life and heritage homestays across Maharashtra.",
            "avatar_url": "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            "cover_image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "rating": 4.8,
            "review_count": 210,
            "is_verified": True,
            "location": "Satara, Maharashtra"
        }
    ]

    async with AsyncSessionLocal() as session:
        # Insert Destinations
        for data in destinations_data:
            result = await session.execute(select(Destination).where(Destination.slug == data["slug"]))
            existing = result.scalar_one_or_none()
            if not existing:
                dest = Destination(**data)
                session.add(dest)
                print(f"Adding destination: {data['title']}")
        
        # Insert Operators
        for data in operators_data:
            op_id = data.pop("id")
            result = await session.execute(select(Operator).where(Operator.name == data["name"]))
            existing = result.scalar_one_or_none()
            if not existing:
                op = Operator(id=op_id, **data)
                session.add(op)
                print(f"Adding operator: {data['name']}")
        
        await session.commit()
        
        # Fetch inserted destinations
        result = await session.execute(select(Destination))
        dests = result.scalars().all()
        dest_map = {d.slug: d.id for d in dests}
        
        # Adventures Data
        adventures_data = [
            {
                "slug": "harishchandragad-trek",
                "title": "Harishchandragad Summit Trek",
                "short_description": "Challenge yourself with this historic ascent featuring the magnificent Konkan Kada.",
                "description": "Harishchandragad is a hill fort in the Ahmednagar district of India. Its history is linked with that of Malshej Ghat, kothale village and it has played a major role in guarding and controlling the surrounding region. The most fascinating spot is the Konkan Kada, a huge cliff which is almost 1423 m high.",
                "activity_type": "Trekking",
                "difficulty": "Hard",
                "duration_days": 2,
                "price": 1499.0,
                "image_url": "https://images.unsplash.com/photo-1629853974441-2b04f7bf5b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("malshej-ghat"),
                "operator_id": "op-1"
            },
            {
                "slug": "rajmachi-monsoon-trek",
                "title": "Rajmachi Monsoon Trek",
                "short_description": "A beautiful trek through lush green valleys and waterfalls near Lonavala.",
                "description": "Rajmachi Fort is one of the many historical forts in the rugged hills of Sahyadri mountains. The trek to Rajmachi is a very popular one, especially during the monsoon season when the entire region turns lush green and numerous waterfalls adorn the mountains.",
                "activity_type": "Trekking",
                "difficulty": "Moderate",
                "duration_days": 1,
                "price": 999.0,
                "image_url": "https://images.unsplash.com/photo-1596884102905-24c65e8ec2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("lonavala"),
                "operator_id": "op-1"
            },
            {
                "slug": "pawna-lake-camping",
                "title": "Pawna Lake Lakeside Camping",
                "short_description": "Relaxing overnight camping experience by the serene Pawna Lake.",
                "description": "Pawna Lake is a beautiful artificial reservoir located close to Lonavala. It has become a very popular camping destination. Spend a night under the stars, enjoy a campfire, BBQ, and soothing music with your friends and family.",
                "activity_type": "Camping",
                "difficulty": "Easy",
                "duration_days": 2,
                "price": 1200.0,
                "image_url": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("lonavala"),
                "operator_id": "op-2"
            },
            {
                "slug": "pratapgad-heritage-walk",
                "title": "Pratapgad Heritage Walk",
                "short_description": "Explore the historic Pratapgad fort and its rich Maratha heritage.",
                "description": "Pratapgad is a large fort located in Satara district, close to Mahabaleshwar. Significant as the site of the Battle of Pratapgad, the fort is now a popular tourist destination. The heritage walk offers a deep dive into its glorious past.",
                "activity_type": "Trekking",
                "difficulty": "Easy",
                "duration_days": 1,
                "price": 500.0,
                "image_url": "https://images.unsplash.com/photo-1598091383021-14374b5c77e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("mahabaleshwar"),
                "operator_id": "op-1"
            },
            {
                "slug": "rajmachi-peak-domes",
                "title": "Rajmachi Peak Domes",
                "short_description": "Immerse yourself in nature without sacrificing comfort. Eco-domes with panoramic views.",
                "description": "Luxury glamping at its finest. Enjoy eco-domes offering panoramic views of the Sahyadri mountains with bonfire, hot water, and local meals included.",
                "activity_type": "Stay",
                "difficulty": "Easy",
                "duration_days": 2,
                "price": 3500.0,
                "image_url": "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("lonavala"),
                "operator_id": "op-2"
            },
            {
                "slug": "the-patil-wada",
                "title": "The Patil Wada",
                "short_description": "Experience authentic rural life in a 100-year-old restored courtyard home.",
                "description": "Heritage homestay near the base of the mountains. Enjoy home-cooked meals and a digital detox in this beautiful, historic setting.",
                "activity_type": "Stay",
                "difficulty": "Easy",
                "duration_days": 3,
                "price": 2500.0,
                "image_url": "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("mahabaleshwar"),
                "operator_id": "op-3"
            },
            {
                "slug": "kalsubai-summit-camp",
                "title": "Kalsubai Summit Camp",
                "short_description": "Pitch perfect at the highest point in Maharashtra. Basic amenities, maximum adventure.",
                "description": "A remote alpine tent experience for the extreme adventurer. Includes sleeping bags and dry rations, with guided setup near the summit area.",
                "activity_type": "Stay",
                "difficulty": "Hard",
                "duration_days": 2,
                "price": 1800.0,
                "image_url": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "destination_id": dest_map.get("malshej-ghat"),
                "operator_id": "op-1"
            }
        ]

        # Insert Adventures
        for data in adventures_data:
            if not data.get("destination_id"):
                continue
                
            result = await session.execute(select(Adventure).where(Adventure.slug == data["slug"]))
            existing = result.scalar_one_or_none()
            if not existing:
                adv = Adventure(**data)
                session.add(adv)
                print(f"Adding adventure: {data['title']}")

        await session.commit()
        print("Database seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_data())
