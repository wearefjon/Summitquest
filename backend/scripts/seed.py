import asyncio
import sys
from pathlib import Path
from sqlalchemy import select

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

sys.path.append(str(Path(__file__).parent.parent))

from app.database import engine, Base
from app.models.destination import Destination
from app.models.adventure import Adventure
from app.models.operator import Operator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

# Re-initializing engine with connect_args for prepared statement cache
from sqlalchemy.ext.asyncio import create_async_engine
from app.config import get_settings
settings = get_settings()
engine = create_async_engine(settings.database_url, connect_args={"prepare_threshold": None})

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def seed_data():
    from app.config import get_settings
    settings = get_settings()
    if settings.environment == "production":
        raise RuntimeError("Cannot run seed script in production")
        
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
        {"slug": "lonavala", "title": "Lonavala", "short_description": "Verdant valleys & cascading waterfalls", "description": "Lonavala is a popular hill station close to Pune and Mumbai.", "image_url": "https://images.unsplash.com/photo-1596884102905-24c65e8ec2b6?auto=format&fit=crop&w=800&q=80", "tag": "Monsoon Special"},
        {"slug": "malshej-ghat", "title": "Malshej Ghat", "short_description": "Dramatic cliffs & avian wildlife", "description": "A haven for nature lovers and trekkers.", "image_url": "https://images.unsplash.com/photo-1629853974441-2b04f7bf5b56?auto=format&fit=crop&w=800&q=80", "tag": "Rugged Terrain"},
        {"slug": "mahabaleshwar", "title": "Mahabaleshwar", "short_description": "Expansive plateaus & strawberry trails", "description": "Mahabaleshwar features sweeping views and pleasant weather.", "image_url": "https://images.unsplash.com/photo-1598091383021-14374b5c77e7?auto=format&fit=crop&w=800&q=80", "tag": "Leisure Escapes"},
        {"slug": "sindhudurg", "title": "Sindhudurg", "short_description": "Pristine beaches & marine life", "description": "Coastal paradise known for scuba diving and historic sea forts.", "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", "tag": "Coastal Escapes"},
        {"slug": "kamshet", "title": "Kamshet", "short_description": "Paragliding paradise", "description": "Known as the paragliding capital of Maharashtra.", "image_url": "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=800&q=80", "tag": "Aero Sports"},
        {"slug": "kolad", "title": "Kolad", "short_description": "White water river rafting", "description": "Thrill-seeker's destination on the Kundalika river.", "image_url": "https://images.unsplash.com/photo-1530866495561-507c9faac2dd?auto=format&fit=crop&w=800&q=80", "tag": "River Adventures"},
        {"slug": "mumbai", "title": "Mumbai", "short_description": "Historic monuments & coastal vibes", "description": "The bustling metropolis featuring rich heritage architecture.", "image_url": "https://images.unsplash.com/photo-1580974928064-f0aeef70895a?auto=format&fit=crop&w=800&q=80", "tag": "City & Heritage"},
        {"slug": "aurangabad", "title": "Aurangabad", "short_description": "Ancient rock-cut caves", "description": "Gateway to the world heritage sites of Ajanta and Ellora.", "image_url": "https://images.unsplash.com/photo-1603501235380-424a5204481d?auto=format&fit=crop&w=800&q=80", "tag": "Historical Wonders"},
    ]

    operators_data = [
        {"id": "op-1", "name": "Sahyadri Rangers", "description": "Expert local guides.", "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", "cover_image_url": "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=800&q=80", "rating": 4.9, "review_count": 128, "is_verified": True, "location": "Pune, Maharashtra"},
        {"id": "op-2", "name": "Aqua Adventures", "description": "Certified dive masters and rafting experts.", "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", "cover_image_url": "https://images.unsplash.com/photo-1536697246787-1f27632a56dd?auto=format&fit=crop&w=800&q=80", "rating": 4.8, "review_count": 95, "is_verified": True, "location": "Mumbai, Maharashtra"},
        {"id": "op-3", "name": "Heritage Guides", "description": "Historians and archaeologists leading immersive tours.", "avatar_url": "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80", "cover_image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", "rating": 4.9, "review_count": 210, "is_verified": True, "location": "Aurangabad, Maharashtra"}
    ]

    async with AsyncSessionLocal() as session:
        for data in destinations_data:
            session.add(Destination(**data))
            print(f"Added destination: {data['title']}")
        
        for data in operators_data:
            op_id = data.pop("id")
            session.add(Operator(id=op_id, **data))
            print(f"Added operator: {data['name']}")
        
        await session.commit()
        
        result = await session.execute(select(Destination))
        dests = result.scalars().all()
        dest_map = {d.slug: d.id for d in dests}
        
        adventures_data = [
            {
                "slug": "harishchandragad-trek", "title": "Harishchandragad Summit Trek", 
                "short_description": "Challenge yourself with this historic ascent.", "description": "Harishchandragad is a hill fort in the Ahmednagar district of India.", 
                "activity_type": "Trekking", "difficulty": "Hard", "duration_days": 2, "price": 1499.0, 
                "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/33/f7/cb/img-20171024-141916091.jpg?w=900&h=500&s=1",
                "gallery_urls": ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/33/f7/cb/img-20171024-141916091.jpg?w=900&h=500&s=1", "https://harishchandragad.in/wp-content/uploads/2022/08/kokankada-sunset-scaled.jpg", "https://vl-prod-static.b-cdn.net/system/images/000/605/622/e193e53e7b8d702855b40a6aa0d3ec4c/original/IMG_2015.jpeg", "https://www.supertrekkers.in/wp-content/uploads/2023/10/Kedareshwar-Cave-3-1024x575-1-1024x575.jpg"],
                "destination_id": dest_map.get("malshej-ghat"), "operator_id": "op-1"
            },
            {
                "slug": "rajmachi-monsoon-trek", "title": "Rajmachi Monsoon Trek", 
                "short_description": "A beautiful trek through lush green valleys.", "description": "Rajmachi Fort is one of the many historical forts in the rugged hills.", 
                "activity_type": "Trekking", "difficulty": "Moderate", "duration_days": 1, "price": 999.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rajmachi.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/d/d5/Rajmachi.jpg", "https://media-cdn.tripadvisor.com/media/photo-p/09/34/f8/c4/rajmachi-fort.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Shiva_Temple%2C_Rajmachi_Village.jpg/500px-Shiva_Temple%2C_Rajmachi_Village.jpg", "https://images.alltrails.com/mugen/image/location-app-router?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTIyMDk3MzUxLzYyYmFkOWI2ZWE5ZTM3OTI2ZDAzMTBiNjRlZDRjNTU2LmpwZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6IjEwODAiLCJoZWlnaHQiOiI3MDAiLCJmaXQiOiJjb3ZlciJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ%3D%3D&w=3840&q=90"],
                "destination_id": dest_map.get("lonavala"), "operator_id": "op-1"
            },
            {
                "slug": "pawna-lake-camping", "title": "Pawna Lake Lakeside Camping", 
                "short_description": "Relaxing overnight camping experience.", "description": "Pawna Lake is a beautiful artificial reservoir located close to Lonavala.", 
                "activity_type": "Camping", "difficulty": "Easy", "duration_days": 2, "price": 1200.0, 
                "image_url": "https://letsgopawna.com/wp-content/uploads/2025/10/@@.jpg",
                "gallery_urls": ["https://letsgopawna.com/wp-content/uploads/2025/10/@@.jpg", "https://pawnacamp.com/storage/2019/12/Pawna-lake-monsoon-time.jpg", "https://bizimages.withfloats.com/actual/65c20bc0c11d530a702aba8a.jpg"],
                "destination_id": dest_map.get("lonavala"), "operator_id": "op-1"
            },
            {
                "slug": "tarkarli-scuba", "title": "Tarkarli Scuba Diving", 
                "short_description": "Discover vibrant coral reefs.", "description": "Dive deep into the Arabian Sea to explore marine life around the Sindhudurg Fort.", 
                "activity_type": "Ocean Diving", "difficulty": "Moderate", "duration_days": 1, "price": 2500.0, 
                "image_url": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/656411102.jpg?k=7e1185b2b5cee354505b239d9266d7b4e14922dcc32f66404c06554bacdbac1a&o=",
                "gallery_urls": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/656411102.jpg?k=7e1185b2b5cee354505b239d9266d7b4e14922dcc32f66404c06554bacdbac1a&o=", "https://images.travelxp.com/images/india/konark/scubaindia.png?tr=w-1920,q-85,f-auto", "https://media1.thrillophilia.com/filestore/twb48to5jfk0b9xs6ykxoxjp3n58_s7.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Tw_iCFj_Ou-FfKadK4bzdyJq-CNYRc_WeqoE3-FEGGC60lMM48AUI0&s=10"],
                "destination_id": dest_map.get("sindhudurg"), "operator_id": "op-2"
            },
            {
                "slug": "kamshet-paragliding", "title": "Kamshet Paragliding Flight", 
                "short_description": "Soar over the Western Ghats.", "description": "Tandem paragliding experience with certified pilots over scenic valleys.", 
                "activity_type": "Paragliding", "difficulty": "Easy", "duration_days": 1, "price": 3000.0, 
                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtDBE78tAP_9ZEsPCDV_6mM_tr1ABdBzjMeNENGG_upaatT7d1Vy3lh6L&s=10",
                "gallery_urls": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtDBE78tAP_9ZEsPCDV_6mM_tr1ABdBzjMeNENGG_upaatT7d1Vy3lh6L&s=10", "https://static2.tripoto.com/media/filter/tst/img/3631/TripDocument/1502066707_paragliding_1306381_960_720.jpg.webp", "https://static.toiimg.com/thumb/68359338/Kamshet.jpg?width=636&height=358&resize=4"],
                "destination_id": dest_map.get("kamshet"), "operator_id": "op-1"
            },
            {
                "slug": "kolad-rafting", "title": "Kolad River Rafting", 
                "short_description": "White water rafting on the Kundalika.", "description": "Experience thrilling Grade II and III rapids on Maharashtra's fastest flowing river.", 
                "activity_type": "Water Sports", "difficulty": "Moderate", "duration_days": 1, "price": 1800.0, 
                "image_url": "https://www.tripplatform.com/blog/wp-content/uploads/2015/05/Rafting-in-Kolad2.jpg",
                "gallery_urls": ["https://www.tripplatform.com/blog/wp-content/uploads/2015/05/Rafting-in-Kolad2.jpg", "https://www.justahotels.com/wp-content/uploads/2023/12/SM104354.jpg", "https://www.justahotels.com/wp-content/uploads/2024/01/stock-photo-rafting-stunt-while-whitewater-rafting-rishikesh-india-1372981319-transformed.jpeg", "https://www.kolad.in/cdn/shop/t/3/assets/slideshow_1.jpg?v=101858263937160793371392805806"],
                "destination_id": dest_map.get("kolad"), "operator_id": "op-2"
            },
            {
                "slug": "ajanta-ellora-tour", "title": "Ajanta & Ellora Caves Tour", 
                "short_description": "Immersive history tour.", "description": "Guided walking tour of the ancient rock-cut caves and UNESCO World Heritage sites.", 
                "activity_type": "Sightseeing", "difficulty": "Easy", "duration_days": 2, "price": 2200.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/17/008_Cave_1%2C_In_the_Forest_%2834239644366%29.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/1/17/008_Cave_1%2C_In_the_Forest_%2834239644366%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/f6/003_Cave_16%2C_Main_Shrine_%2834298723855%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/97/013_Cave_19%2C_Buddha_Meditating_%2833535639164%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/9f/%2APlate_3%2A_%3D%3D_Ajunta--_Interior_of_Chaitya_Cave%2C_No._10.jpg"],
                "destination_id": dest_map.get("aurangabad"), "operator_id": "op-3"
            },
            {
                "slug": "gateway-of-india-walk", "title": "Gateway of India Heritage Walk", 
                "short_description": "Explore South Mumbai's architecture.", "description": "A guided evening walk starting from the Gateway of India to Marine Drive.", 
                "activity_type": "Sightseeing", "difficulty": "Easy", "duration_days": 1, "price": 800.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Arch_of_Gateway_of_India.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/6/6d/Arch_of_Gateway_of_India.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/ac/3_December_2008_Gateway_protest_march_5.jpg", "https://upload.wikimedia.org/wikipedia/commons/2/25/Beating_Retreat_and_Tattoo_ceremony_at_Gateway_of_India%2C_2018_%289%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/8/83/Chowpatti.jpg"],
                "destination_id": dest_map.get("mumbai"), "operator_id": "op-3"
            },
            {
                "slug": "lohagad-hike", "title": "Lohagad Fort Hike", 
                "short_description": "A perfect beginner hike with great views.", "description": "Lohagad is one of the most accessible forts near Pune, ideal for a quick day hike.", 
                "activity_type": "Hiking", "difficulty": "Easy", "duration_days": 1, "price": 600.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Lohagad-2.JPG",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/6/6b/Lohagad-2.JPG", "https://upload.wikimedia.org/wikipedia/commons/0/0f/Bastions_of_Lohagad_Fort_7.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/42/Ganesh_Darwaja.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/a4/Lohagad_01.jpg"],
                "destination_id": dest_map.get("lonavala"), "operator_id": "op-1"
            },
            {
                "slug": "kalsubai-summit-camp", "title": "Kalsubai Summit Camp", 
                "short_description": "Highest point in Maharashtra.", "description": "Camp near the summit and catch the most breathtaking sunrise.", 
                "activity_type": "Camping", "difficulty": "Hard", "duration_days": 2, "price": 1800.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Kalasubai.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/9/9e/Kalasubai.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/f1/Kalasubai_from_base.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/52/Kalasubai_steps.jpg", "https://upload.wikimedia.org/wikipedia/commons/e/e6/Kalsubai%2C_Western_Ghats.jpg"],
                "destination_id": dest_map.get("malshej-ghat"), "operator_id": "op-1"
            },
            {
                "slug": "alibaug-water-sports", "title": "Alibaug Beach Water Sports", 
                "short_description": "Jet skis, banana rides, and parasailing.", "description": "Spend a full day enjoying motorized water sports on the beaches of Alibaug.", 
                "activity_type": "Water Sports", "difficulty": "Easy", "duration_days": 1, "price": 1500.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Alibag_Sea_beach_3%2C_Maharashtra.JPG",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/1/1d/Alibag_Sea_beach_3%2C_Maharashtra.JPG", "https://upload.wikimedia.org/wikipedia/commons/7/76/Alibag_1896.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d3/Ferry_to_Mandwa.JPG", "https://upload.wikimedia.org/wikipedia/commons/7/74/Kanhoji_Angre_Samadhi_-_%E0%A4%95%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%B9%E0%A5%8B%E0%A4%9C%E0%A5%80_%E0%A4%86%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A5%87_%E0%A4%B8%E0%A4%AE%E0%A4%BE%E0%A4%A7%E0%A5%80_1.JPG"],
                "destination_id": dest_map.get("sindhudurg"), "operator_id": "op-2"
            },
            {
                "slug": "panchgani-paragliding", "title": "Panchgani Paragliding", 
                "short_description": "Fly over the table land.", "description": "Tandem flights over the massive volcanic plateau of Panchgani.", 
                "activity_type": "Paragliding", "difficulty": "Easy", "duration_days": 1, "price": 3200.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Panchghani_Hill.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/4/4c/Panchghani_Hill.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/aa/Strawberries_being_cultivated_in_a_farm_in_Panchgani.jpg", "https://images.unsplash.com/photo-1629853974441-2b04f7bf5b56?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1596884102905-24c65e8ec2b6?auto=format&fit=crop&w=800&q=80"],
                "destination_id": dest_map.get("mahabaleshwar"), "operator_id": "op-1"
            },
            {
                "slug": "elephanta-caves", "title": "Elephanta Caves Exploration", 
                "short_description": "Ferry ride and cave exploration.", "description": "Take a ferry from the Gateway of India to explore the ancient Elephanta Caves.", 
                "activity_type": "Sightseeing", "difficulty": "Moderate", "duration_days": 1, "price": 1200.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/Aquatint_of_the_Stone_Elephant.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/8/88/Aquatint_of_the_Stone_Elephant.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/30/Ardhanari%40_Elephanta_Caves.jpg", "https://upload.wikimedia.org/wikipedia/commons/8/8b/Brahma_statue_%286th_century_CE%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/c7/Cave_of_Elephants_1905.jpg"],
                "destination_id": dest_map.get("mumbai"), "operator_id": "op-3"
            },
            {
                "slug": "bhandardara-camping", "title": "Bhandardara Lakeside Camping", 
                "short_description": "Starry nights by Arthur Lake.", "description": "Enjoy the cool breeze and clear skies by the pristine Arthur Lake in Bhandardara.", 
                "activity_type": "Camping", "difficulty": "Easy", "duration_days": 2, "price": 1400.0, 
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Bhandardara_lake.jpg",
                "gallery_urls": ["https://upload.wikimedia.org/wikipedia/commons/b/b8/Bhandardara_lake.jpg", "https://images.unsplash.com/photo-1629853974441-2b04f7bf5b56?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1596884102905-24c65e8ec2b6?auto=format&fit=crop&w=800&q=80"],
                "destination_id": dest_map.get("malshej-ghat"), "operator_id": "op-1"
            },
            {
                "slug": "malvan-scuba", "title": "Malvan Deep Sea Scuba", 
                "short_description": "Advanced scuba diving experience.", "description": "Explore shipwrecks and deeper coral reefs off the coast of Malvan.", 
                "activity_type": "Ocean Diving", "difficulty": "Extreme", "duration_days": 2, "price": 4500.0, 
                "image_url": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/656411102.jpg?k=7e1185b2b5cee354505b239d9266d7b4e14922dcc32f66404c06554bacdbac1a&o=",
                "gallery_urls": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/656411102.jpg?k=7e1185b2b5cee354505b239d9266d7b4e14922dcc32f66404c06554bacdbac1a&o=", "https://images.travelxp.com/images/india/konark/scubaindia.png?tr=w-1920,q-85,f-auto", "https://media1.thrillophilia.com/filestore/twb48to5jfk0b9xs6ykxoxjp3n58_s7.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Tw_iCFj_Ou-FfKadK4bzdyJq-CNYRc_WeqoE3-FEGGC60lMM48AUI0&s=10"],
                "destination_id": dest_map.get("sindhudurg"), "operator_id": "op-2"
            }
        ]

        for data in adventures_data:
            session.add(Adventure(**data))
            print(f"Added adventure: {data['title']}")

        await session.commit()
        print("Database seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_data())
