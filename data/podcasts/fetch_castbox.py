"""Fetch CastBox channel data - step 1: channel titles and descriptions"""
import json, re, urllib.request, ssl, time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

CHANNELS = [
    "2538237","2386830","4888005","5065616","2451868","5732511","3780344",
    "4717891","2216999","4946220","4801837","4083056","4051782","4374790",
    "2506491","6807273","5352438","2389029","5439663","5593053","4097903",
    "3837542","5233647","7274752","6584239","5558670","5258942","1554300"
]

results = []
for i, ch_id in enumerate(CHANNELS):
    url = f"https://castbox.fm/vh/{ch_id}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=10, context=ctx)
        html = resp.read().decode("utf-8", errors="ignore")
        
        # Extract title
        t = re.search(r'<title>([^<]+)</title>', html)
        title = t.group(1).strip() if t else f"Channel {ch_id}"
        
        # Extract description
        d = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
        desc = d.group(1).strip() if d else ""
        
        # Extract channel image
        img = re.search(r'<meta\s+property="og:image"\s+content="([^"]*)"', html)
        image = img.group(1) if img else ""
        
        results.append({"id": ch_id, "title": title, "desc": desc, "image": image, "episodes": []})
        print(f"[{i+1}/28] {title[:50]}")
    except Exception as e:
        print(f"[{i+1}/28] ERROR {ch_id}: {e}")
        results.append({"id": ch_id, "title": f"Channel {ch_id}", "desc": "", "image": "", "episodes": []})
    time.sleep(0.5)

json.dump(results, open("D:/openclaw/Projects/yaran/data/podcasts/_castbox_raw.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"\nSaved {len(results)} channels")
