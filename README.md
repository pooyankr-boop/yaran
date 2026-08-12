# Yaran Kindergarten Virtual Tour

 Persian kindergarten virtual tour with interactive room exploration.

## Quick Deploy to GitHub Pages

1. Create new GitHub repository
2. Upload all contents of this folder as root
3. Go to Settings → Pages → Source: main branch
4. Site live at: `https://[your-username].github.io/[repo-name]`

## Structure

```
├── index.html          # Entry point
├── css/main.css        # Styles (40KB)
├── js/                 # JavaScript modules
│   ├── rooms.js        # Room data (948KB)
│   ├── tour.js         # Navigation logic
│   ├── games.js        # Educational games
│   ├── games2.js       # Additional games
│   ├── lobby.js        # Tips & slideshow
│   ├── archive.js      # 834 worksheets
│   ├── api.js          # API client (graceful fallback)
│   ├── media.js        # PDF/video player
│   └── tags.js         # Tag system
└── assets/
    ├── images/         # 57 WebP thumbnails (6MB)
    ├── pdf/            # Sample documents
    └── video/          # Intro videos (5MB)
```

## Features

- 13 interactive rooms with 4-view panoramic tours
- 8 educational games
- 834 printable worksheets (from somayehrouhi.ir)
- Daily parenting tips
- Content slideshow
- Responsive design (mobile-friendly)
- Day/Night/Festival themes

## Offline Support

All dependencies are loaded from CDN or bundled locally. Works offline after first load.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---
Built with vanilla JS + CSS, no frameworks required.
