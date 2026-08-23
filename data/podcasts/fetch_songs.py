"""Fetch children songs from istgahekoodak.ir via WP REST API"""
import json, urllib.request, ssl, re, time, html as htmllib

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Step 1: Get all posts from children-songs category (id=9)
all_posts = []
page = 1
while True:
    url = f"https://istgahekoodak.ir/wp-json/wp/v2/posts?categories=9&per_page=20&page={page}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=15, context=ctx)
        data = json.loads(resp.read())
        if not data:
            break
        all_posts.extend(data)
        print(f"Page {page}: {len(data)} posts (total: {len(all_posts)})")
        page += 1
        time.sleep(0.3)
    except Exception as e:
        print(f"Page {page}: {e}")
        break

print(f"\nTotal posts: {len(all_posts)}")

# Step 2: Extract audio URLs and lyrics from each post
songs = []
for i, post in enumerate(all_posts):
    title = htmllib.unescape(post["title"]["rendered"])
    content = post["content"]["rendered"]
    link = post["link"]
    
    # Find MP3/audio URLs in content
    mp3s = re.findall(r'(https?://[^"\'<>\s]+\.(?:mp3|m4a|ogg|wav))', content)
    if not mp3s:
        # Also check for audio shortcodes or embedded players
        mp3s = re.findall(r'src=["\']([^"\']+\.(?:mp3|m4a))', content)
    
    # Extract lyrics/text content (strip HTML)
    text = re.sub(r'<[^>]+>', ' ', content)
    text = re.sub(r'\s+', ' ', text).strip()
    # Remove common non-lyrics content
    text = re.sub(r'(دانلود|download|لینک دانلود|برای دانلود|کلیک کنید).*', '', text, flags=re.I).strip()
    
    audio_url = mp3s[0] if mp3s else None
    
    songs.append({
        "title": title,
        "src": audio_url,
        "url": link,
        "info": text[:300] if text else "",
        "category": "ترانه کودکانه",
        "categoryId": "kids-song"
    })
    
    if (i+1) % 10 == 0:
        print(f"Processed {i+1}/{len(all_posts)}")

# Save
json.dump(songs, open("D:/openclaw/Projects/yaran/data/podcasts/istgah-songs.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
with_audio = sum(1 for s in songs if s["src"])
print(f"\nDone: {len(songs)} songs, {with_audio} with audio URLs")
