# GLP-1 Weight Loss Subscription Theme

A high-conversion Shopify theme designed for subscription-based weight loss programs. This theme includes psychological triggers like countdown timers, social proof notifications, scarcity indicators, and conversion-optimized layouts.

## Features

### Conversion Optimization
- **Countdown Timer Bar**: Creates urgency with persistent countdown timer
- **Social Proof Notifications**: Real-time notifications showing recent signups
- **Scarcity Indicators**: Visual cues for limited availability
- **Sticky Header**: Always-visible navigation and cart access

### Sections Included
- Hero Banner with statistics
- Features Grid
- Testimonials Grid with results
- Pricing Plans with featured option
- Countdown Bar
- Social Proof Notification
- Header with logo and navigation
- Footer with newsletter signup

### Design Features
- Fully responsive (mobile-first)
- Customizable color scheme
- Typography settings
- Animation on scroll
- Smooth scrolling
- Lazy loading images

## Installation

1. Download this theme folder
2. Go to your Shopify Admin
3. Navigate to Online Store > Themes
4. Click "Add theme" > "Upload ZIP file"
5. First, zip the contents of this folder:
   ```bash
   cd shopify-theme
   zip -r ../glp1-weight-loss-theme.zip .
   ```
6. Upload the resulting ZIP file to Shopify

## File Structure

```
shopify-theme/
├── assets/
│   └── global.js          # Global JavaScript
├── config/
│   └── settings_schema.json  # Theme settings
├── layout/
│   └── theme.liquid       # Main layout template
├── locales/
│   └── en.default.json    # English translations
├── sections/
│   ├── header.liquid              # Header section
│   ├── footer.liquid              # Footer section
│   ├── hero-banner.liquid         # Hero section
│   ├── countdown-bar.liquid       # Countdown timer
│   ├── social-proof-notification.liquid  # Social proof
│   ├── features-grid.liquid       # Features section
│   ├── testimonials-grid.liquid   # Testimonials
│   └── pricing-plans.liquid       # Pricing cards
├── snippets/
│   ├── css-variables.liquid  # Global CSS
│   └── meta-tags.liquid      # SEO meta tags
├── templates/
│   ├── index.json        # Homepage template
│   ├── page.json         # Page template
│   ├── product.json      # Product template
│   ├── collection.json   # Collection template
│   └── cart.json         # Cart template
└── README.md
```

## Customization

### Colors
Edit in Theme Settings > Colors:
- Primary Color (default: Green #2E7D32)
- Secondary Color (default: Light Green #81C784)
- Accent Color (default: Orange #FF6B35)
- Background Color
- Text Color

### Social Proof
Enable/disable and configure frequency in Theme Settings > Social Proof Settings

### Countdown Timer
Configure duration and messaging in Theme Settings > Scarcity Settings

## Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License
This theme is provided as-is for use on Shopify stores.

## Support
For theme support, contact your theme developer.
