# 🎯 Yaran Kindergarten - GitHub Deployment Ready

**Status:** ✅ Complete and ready for deployment

---

## 📦 Package Summary

| Metric | Value |
|--------|-------|
| **Total Size** | 12.58 MB |
| **Total Files** | 75 |
| **Location** | `D:\openclaw\Projects\Yaran Kindergarten\main\` |

### File Breakdown
- **HTML:** 1 file (index.html)
- **CSS:** 1 file (main.css, 40KB)
- **JavaScript:** 12 files (1.7MB total)
- **Images:** 57 WebP thumbnails (6MB)
- **Videos:** 2 intro videos (4.9MB)
- **Docs:** README.md + .gitignore

---

## 🚀 Deployment Steps

### Option 1: GitHub Pages (Recommended)
```bash
# 1. Create new repository on GitHub
gh repo create yaran-kindergarten --private

# 2. Clone and copy
cd D:\openclaw\Projects\Yaran Kindergarten\main
git init
git add .
git commit -m "Initial deployment"
git branch -M main
git remote add origin https://github.com/[username]/yaran-kindergarten.git
git push -u origin main

# 3. Enable GitHub Pages
gh repo edit yaran-kindergarten --add-topic=yarden-kindergarten
# Settings → Pages → Source: main branch → / (root)
```

### Option 2: Manual Upload
1. Zip the `main/` folder
2. Upload to GitHub repository
3. Enable Pages in repository settings

---

## 📁 Directory Structure

```
main/
├── index.html                 # Entry point (10KB)
├── README.md                  # This documentation
├── .gitignore                 # Git ignore rules
├── css/
│   └── main.css              # All styles (40KB)
├── js/
│   ├── rooms.js              # Room data (948KB)
│   ├── tour.js               # Navigation logic (22KB)
│   ├── games.js              # Educational games (15KB)
│   ├── games2.js             # Additional games (33KB)
│   ├── lobby.js              # Tips & slideshow (9KB)
│   ├── archive-somayehrouhi.js  # 834 worksheets (622KB)
│   ├── api.js                # API client (3KB)
│   ├── media.js              # PDF/video player (10KB)
│   ├── explorer.js           # Content explorer (7KB)
│   ├── auth.js               # Auth system (5KB)
│   ├── app.js                # App controller (14KB)
│   └── tags.js               # Tag management (3KB)
└── assets/
    ├── images/               # 57 WebP thumbnails (6MB)
    │   ├── amoozesh/
    │   ├── bazi/
    │   ├── khab/
    │   └── ... (13 rooms × 4 views)
    ├── pdf/                  # Sample documents (2KB)
    └── video/                # Intro videos (5MB)
        ├── intro1.mp4
        └── intro2.mp4
```

---

## ✨ Features

- **13 Interactive Rooms** with 4-view panoramic tours
- **8 Educational Games** (Memory, Simon Says, Pattern, Puzzle, etc.)
- **834 Printable Worksheets** from somayehrouhi.ir
- **Daily Parenting Tips** with rotation
- **Content Slideshow** with auto-play
- **Responsive Design** (mobile-friendly)
- **Theme System** (Day/Night/Festival)
- **Offline Support** (after first load)

---

## 🔧 Technical Details

- **Framework:** Vanilla JS + CSS (no dependencies)
- **Browser Support:** Chrome/Edge 90+, Firefox 88+, Safari 14+
- **PDF Viewer:** PDF.js (CDN loaded)
- **Language:** Persian (Farsi) with RTL layout
- **SEO:** Semantic HTML with proper meta tags

---

## ⚠️ Notes

- Largest file: `rooms.js` (948KB) - contains all room data
- Images use WebP format for optimal compression
- Videos are optional (site works without them)
- API client has graceful fallback to static data
- Consider Git LFS if repo grows beyond 1GB

---

## 📝 License

Same as parent project - check original LICENSE file.

---

**Deployed:** 2026-08-12  
**Version:** 1.0.0
