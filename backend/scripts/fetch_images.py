import requests
import json

locations = [
    "Harishchandragad", "Rajmachi", "Pawna Lake", "Pratapgad", "Kalsubai",
    "Tarkarli", "Kamshet", "Kolad", "Elephanta Caves", "Ajanta Caves",
    "Bhandardara", "Lohagad", "Alibag", "Panchgani", "Gateway of India"
]

images_map = {}

def get_images_for_page(title):
    # Get images on page
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=images&titles={title}&format=json&imlimit=10"
    headers = {"User-Agent": "SummitQuestBot/1.0 (contact@summitquest.com)"}
    try:
        r = requests.get(url, headers=headers)
        data = r.json()
        pages = data['query']['pages']
        page = list(pages.values())[0]
        if 'images' not in page:
            return []
        
        image_titles = [img['title'] for img in page['images'] if img['title'].lower().endswith(('.jpg', '.png'))]
        
        # Now get image URLs
        urls = []
        for img_title in image_titles[:4]:
            url2 = f"https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles={img_title}&format=json"
            r2 = requests.get(url2, headers=headers)
            d2 = r2.json()
            p2 = list(d2['query']['pages'].values())[0]
            if 'imageinfo' in p2:
                urls.append(p2['imageinfo'][0]['url'])
        return urls
    except Exception as e:
        print(f"Error for {title}: {e}")
        return []

for loc in locations:
    print(f"Fetching for {loc}...")
    images_map[loc] = get_images_for_page(loc)

with open("images.json", "w") as f:
    json.dump(images_map, f, indent=4)

print("Done!")
