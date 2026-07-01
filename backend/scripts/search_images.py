import json
from duckduckgo_search import DDGS

activities = {
    "ajanta-ellora-tour": "Ajanta Ellora Caves tourism",
    "gateway-of-india-walk": "Gateway of India Mumbai tourist",
    "lohagad-hike": "Lohagad Fort trek",
    "kalsubai-summit-camp": "Kalsubai Peak trek camping",
    "alibaug-water-sports": "Alibaug beach water sports",
    "panchgani-paragliding": "Panchgani paragliding",
    "elephanta-caves": "Elephanta Caves Mumbai",
    "bhandardara-camping": "Bhandardara Lakeside Camping",
    "malvan-scuba": "Malvan deep sea scuba diving"
}

results_map = {}

def fetch_images():
    with DDGS() as ddgs:
        for slug, query in activities.items():
            print(f"Fetching for {slug}...")
            images = list(ddgs.images(query, max_results=4))
            results_map[slug] = [img['image'] for img in images]
            
    with open("fetched_images.json", "w") as f:
        json.dump(results_map, f, indent=4)
    print("Done!")

if __name__ == "__main__":
    fetch_images()
