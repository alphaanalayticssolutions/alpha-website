# Alpha Analytics Solutions - Premium Legal-Tech Website

## Overview
A modern, highly professional frontend design for a legal-tech company featuring a sophisticated light navy-tinted theme with premium gold accents. Built with pure HTML, CSS, and JavaScript—no frameworks required.

## Design Philosophy

### Color Scheme
- **Primary Background**: Light navy-tinted (#F8F9FC) - provides elegant, refined look
- **Deep Navy Blue**: (#0F172A, #1E3A5F) - headings, navigation, primary elements
- **Premium Gold**: (#D4AF37) - subtle accents, highlights, hover effects
- **High Contrast Text**: All text highly visible with strong contrast ratios

### Typography
- **Display Font**: Playfair Display - elegant serif for headings
- **Body Font**: Inter - clean, modern sans-serif for content
- **Strong Hierarchy**: Bold headings, well-spaced body text, clear visual distinction

## Features

### Page 1: Services Overview (index.html)
- **Hero Section**: Compelling headline with gradient text, stats display, dual CTAs
- **AI-Powered Services**: 4 main tools presented in modern cards
  - Divorce Analysis Tool (featured)
  - QC Agentic AI
  - PDF Processing Platform
  - Bank Statement Extraction
- **Traditional Services**: Economic Damages, Family Law, IP Analytics
- **Why Choose Us**: 6 key advantages with icon highlights
- **Call to Action**: Contact section with dual CTAs
- **Professional Footer**: Multi-column layout with links

### Page 2: AI Workflow (workflow.html)
- **Workflow Hero**: Strong introduction to AI capabilities
- **Platform Overview**: 4-stat grid showing key metrics
- **7-Step Processing Pipeline**: Detailed breakdown of each stage
  - Document Intake & Classification
  - Intelligent Data Extraction
  - Two-Layer Quality Control (highlighted)
  - Transaction Analysis (highlighted)
  - Document Enhancement
  - Coverage Matrix & Gap Analysis
  - Court-Ready Deliverables
- **Technology Stack**: 4-card grid showing AI models, libraries, platform
- **Processing Guarantees**: Speed, Accuracy, Security, Court-Ready
- **Call to Action**: Demo scheduling

## Technical Details

### File Structure
```
alpha-website/
├── index.html              # Services overview page
├── workflow.html           # AI workflow page
├── css/
│   └── styles.css         # Complete stylesheet (900+ lines)
├── js/
│   └── main.js            # Interactivity & animations
├── images/                # (Empty - ready for assets)
└── README.md              # This file
```

### Key Features
- **100% Responsive**: Mobile-first design with breakpoints at 768px and 1024px
- **Smooth Animations**: Scroll-triggered animations, hover effects, transitions
- **Accessibility**: Keyboard navigation, semantic HTML, ARIA labels
- **Performance**: Optimized CSS, debounced scroll events, lazy loading support
- **Modern JavaScript**: ES6+, Intersection Observer API, smooth scrolling

### Interactive Elements
- Mobile hamburger menu with animation
- Smooth scroll to sections
- Navbar shadow on scroll
- Card 3D tilt effect on hover (desktop)
- Animated statistics counters
- Active navigation highlighting
- Parallax hero effect

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors
All colors are defined as CSS variables in `:root` at the top of `styles.css`:
```css
--color-navy-dark: #0F172A;
--color-gold: #D4AF37;
```

### Adding Content
1. Edit HTML files directly
2. Follow existing card/section structure
3. Use existing CSS classes for consistency

### Adding Images
1. Place images in `/images` folder
2. Reference in HTML: `<img src="images/your-image.jpg" alt="Description">`
3. Use high-quality images (at least 1920px wide for hero backgrounds)

## Deployment

### Simple Hosting (GitHub Pages, Netlify, Vercel)
1. Upload all files maintaining folder structure
2. Ensure `index.html` is in root directory
3. Point DNS to hosting provider

### Traditional Web Hosting
1. Upload entire folder via FTP/SFTP
2. Ensure correct file permissions (644 for files, 755 for folders)
3. Point domain to `/public_html` or root directory

## Email Setup
Update email links in:
- Navigation CTA button
- Contact section
- Footer

Replace `info@alphaanalyticssol.com` with your actual email.

## SEO Optimization (Recommended)
1. Add meta description tags
2. Add Open Graph tags for social sharing
3. Create `robots.txt` and `sitemap.xml`
4. Optimize images (compress, add alt tags)
5. Add Google Analytics tracking code

## Performance Optimization
- Images: Use WebP format, compress to ~100KB
- CSS: Already minified and optimized
- JavaScript: Consider minifying for production
- Enable GZIP compression on server
- Implement CDN for static assets

## Future Enhancements
- Add contact form with backend integration
- Implement case study/portfolio section
- Add testimonials carousel
- Create blog section
- Add multi-language support
- Integrate analytics dashboard

## Credits
Design & Development: Custom-built for Alpha Analytics Solutions
Fonts: Google Fonts (Inter, Playfair Display)
Icons: Inline SVG (custom)

## License
Proprietary - Alpha Analytics Solutions © 2026

## Support
For questions or issues, contact: info@alphaanalyticssol.com

---

**Note**: This is a static website. For dynamic features (contact forms, user accounts, database integration), backend development will be required.