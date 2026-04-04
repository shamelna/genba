# Genba Ikigai Assets - Hyperlinks for External Embedding

**Custom Domain**: https://genba.kaizenacademy.education/

## Important Note About Vercel Asset URLs
Vercel uses **hashed filenames** for assets in production. The actual filenames include unique hashes for caching. Below are the current build's asset URLs and the general pattern.

## Current Production Asset URLs (Latest Build)

### Main Assets Folder
```html
<!-- App Logo -->
<img src="https://genba.kaizenacademy.education/app-logo.png" alt="Genba Ikigai App Logo">

<!-- Author Images -->
<img src="https://genba.kaizenacademy.education/author-mark-forkun-portrait-5b5c9985.jpg" alt="Mark Forkun Portrait">
<img src="https://genba.kaizenacademy.education/assets/author-mark-forkun-genba-163b6595.jpg" alt="Mark Forkun Genba">
<img src="https://genba.kaizenacademy.education/author-mark-forkun-coaching.jpg" alt="Mark Forkun Coaching">

<!-- Book Images -->
<img src="https://genba.kaizenacademy.education/assets/hero-book-floating-water-b5f617eb.jpg" alt="Hero Book Floating Water">
<img src="https://genba.kaizenacademy.education/assets/book-3d-mockup-editorial-76bbc764.jpg" alt="Book 3D Mockup">
<img src="https://genba.kaizenacademy.education/assets/book-open-desk-ef1205d5.jpg" alt="Book Open Desk">
<img src="https://genba.kaizenacademy.education/book-spine-detail.jpg" alt="Book Spine Detail">

<!-- Character Avatars -->
<img src="https://genba.kaizenacademy.education/kenji.png" alt="Kenji Avatar">
<img src="https://genba.kaizenacademy.education/Sarah.png" alt="Sarah Avatar">

<!-- Bus Cards (Ikigai Compass) -->
<img src="https://genba.kaizenacademy.education/assets/red-bus-card-bbe6d9d0.jpg" alt="Red Bus Card">
<img src="https://genba.kaizenacademy.education/assets/amber-bus-card-46ec7489.jpg" alt="Amber Bus Card">
<img src="https://genba.kaizenacademy.education/assets/green-bus-card-cc07aa74.jpg" alt="Green Bus Card">

<!-- UI Elements -->
<img src="https://genba.kaizenacademy.education/assets/single-stone-card-ecc7c317.jpg" alt="Single Stone Card">
<img src="https://genba.kaizenacademy.education/single-stone-icon.jpg" alt="Single Stone Icon">
<img src="https://genba.kaizenacademy.education/assets/habit-checkin-desk-bg-99e2399e.jpg" alt="Habit Check-in Background">

<!-- Ikigai Elements -->
<img src="https://genba.kaizenacademy.education/assets/ikigai-compass-background-54acaa8d.jpg" alt="Ikigai Compass Background">
<img src="https://genba.kaizenacademy.education/assets/ikigai-map-illustration-789d8b3d.jpg" alt="Ikigai Map Illustration">

<!-- Background & UI -->
<img src="https://genba.kaizenacademy.education/case study background.png" alt="Case Study Background">
<img src="https://genba.kaizenacademy.education/fav icon.png" alt="Favorite Icon">
```

### New Images Folder
```html
<!-- New Images Added -->
<img src="https://genba.kaizenacademy.education/Genba Ikigai.png" alt="Genba Ikigai">
<img src="https://genba.kaizenacademy.education/PDCA.png" alt="PDCA Cycle">
```

## Asset Categories & Usage

### 📚 Book & Author Assets
- **Purpose**: Branding, about sections, marketing materials
- **Key Images**: Author portraits, book mockups, hero images
- **Recommended Size**: Use original dimensions for best quality

### 👥 Character Avatars
- **Purpose**: User personas, case studies, interactive elements
- **Characters**: Kenji (male avatar), Sarah (female avatar)
- **Usage**: Profile pictures, chat interfaces, story elements

### 🎯 Ikigai Compass Elements
- **Purpose**: Premium feature - Ikigai Map and Bus Check-in
- **Elements**: Red/Amber/Green bus cards, compass background, map illustration
- **Interactive**: Used in compass functionality

### 🎨 UI & Background Assets
- **Purpose**: App interface, backgrounds, decorative elements
- **Elements**: Stone cards, habit check-in backgrounds, case study backgrounds
- **Usage**: Component backgrounds, cards, sections

### 📊 Educational Content
- **Purpose**: Learning materials, diagrams, illustrations
- **New**: PDCA cycle diagram, Genba Ikigai concept illustration
- **Usage**: Educational content, tutorials, guides

## HTML Embedding Examples

### Basic Image Embedding
```html
<!-- Standard image -->
<img src="https://genba.kaizenacademy.education/kenji.png" 
     alt="Kenji Avatar" 
     style="width:200px;height:auto;border-radius:50%;">

<!-- With responsive sizing -->
<img src="https://genba.kaizenacademy.education/hero-book-floating-water-b5f617eb.jpg" 
     alt="Genba Ikigai Book" 
     style="width:100%;max-width:600px;height:auto;">
```

### Background Images
```html
<!-- CSS background -->
<div style="background-image:url('https://genba.kaizenacademy.education/ikigai-compass-background-54acaa8d.jpg');
            background-size:cover;
            background-position:center;
            min-height:400px;">
  <!-- Content here -->
</div>
```

### Figure with Caption
```html
<figure>
  <img src="https://genba.kaizenacademy.education/assets/Images/PDCA.png" 
       alt="PDCA Cycle" 
       style="width:100%;max-width:500px;">
  <figcaption>Plan-Do-Check-Act Cycle for Continuous Improvement</figcaption>
</figure>
```

## Important Notes

### ⚠️ Hashed Filenames
- Vercel adds unique hashes to filenames for caching
- Hashes change with each deployment
- For stable URLs, consider using unhashed assets in public folder

### 🔄 Updating After Deployments
After each new deployment, check the actual filenames in:
```
https://genba.kaizenacademy.education/assets/
```

### 📱 Responsive Design
Always include responsive styling:
```css
max-width: 100%;
height: auto;
```

### 🎯 Best Practices
- Use descriptive `alt` text for accessibility
- Include `width` and `height` attributes for performance
- Use appropriate image formats (WebP for modern browsers)
- Consider lazy loading for large images

## Quick Copy-Paste URLs

### Most Commonly Used Assets
```html
<!-- Kenji Avatar -->
https://genba.kaizenacademy.education/kenji.png

<!-- Sarah Avatar -->
https://genba.kaizenacademy.education/Sarah.png

<!-- Hero Book Image -->
https://genba.kaizenacademy.education/assets/hero-book-floating-water-b5f617eb.jpg

<!-- Genba Ikigai Logo -->
https://genba.kaizenacademy.education/app-logo.png

<!-- PDCA Diagram -->
https://genba.kaizenacademy.education/PDCA.png

<!-- Red Bus Card -->
https://genba.kaizenacademy.education/assets/red-bus-card-bbe6d9d0.jpg
```

## Testing Your Embeds
Always test your embedded images after deployment to ensure:
1. ✅ Images load correctly
2. ✅ Responsive behavior works
3. ✅ Alt text displays properly
4. ✅ Performance is acceptable

---

**Last Updated**: April 4, 2026  
**Build Version**: Current production deployment  
**Total Assets**: 24 images in main folder + 2 in Images subfolder
