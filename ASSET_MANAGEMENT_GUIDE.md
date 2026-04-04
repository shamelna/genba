# Asset Management Strategy Guide

## 📁 Where to Place New Assets

### 🎯 For External Hyperlinks (Your Use Case)
**Place in**: `public/images/[category]/`

```
public/
├── images/
│   ├── blog/           # Blog post images
│   ├── social/         # Social media images
│   ├── marketing/      # Marketing materials
│   ├── general/        # General purpose images
│   └── tutorials/      # Tutorial screenshots
```

**URL Pattern**: `https://genba.kaizenacademy.education/images/[category]/filename.png`

### 🔧 For React Components Only
**Place in**: `src/assets/` or `assets/`

**URL Pattern**: `https://genba.kaizenacademy.education/assets/filename-[hash].png`

## 🚀 Quick Workflow for Adding New Assets

### Step 1: Add Asset
```bash
# Example: Add a new blog image
copy "new-image.png" "public\images\blog\"
```

### Step 2: Update Hyperlinks
Add to your `ASSETS_HYPERLINKS.md`:
```html
<!-- Blog Images -->
<img src="https://genba.kaizenacademy.education/images/blog/new-image.png" alt="Description">
```

### Step 3: Deploy
```bash
git add .
git commit -m "Add new blog image"
git push origin main
```

### Step 4: Test
Wait 1-2 minutes, then test:
`https://genba.kaizenacademy.education/images/blog/new-image.png`

## 📋 Asset Categories & Examples

### 📝 Blog Content
```
public/images/blog/
├── lean-principles.png
├── kaizen-methodology.jpg
└── genba-workspace.png
```

**URLs:**
- `https://genba.kaizenacademy.education/images/blog/lean-principles.png`
- `https://genba.kaizenacademy.education/images/blog/kaizen-methodology.jpg`

### 📱 Social Media
```
public/images/social/
├── facebook-cover.png
├── twitter-banner.jpg
└── linkedin-post.png
```

**URLs:**
- `https://genba.kaizenacademy.education/images/social/facebook-cover.png`

### 🎯 Marketing Materials
```
public/images/marketing/
├── course-promo.jpg
├── workshop-banner.png
└── certification-badge.png
```

### 📚 Educational Content
```
public/images/tutorials/
├── step-1-screenshot.png
├── workflow-diagram.svg
└── example-dashboard.jpg
```

## ⚡ Best Practices

### 🏷️ Naming Conventions
- **Use lowercase**: `my-image.png` (not `My-Image.png`)
- **Use hyphens**: `lean-principles.png` (not `lean_principles.png`)
- **Be descriptive**: `genba-workspace-2024.png` (not `img1.png`)

### 📏 File Optimization
- **Images**: Use WebP format for better compression
- **Size**: Keep under 2MB for web performance
- **Dimensions**: Optimize for intended use (no oversized images)

### 🔄 Version Management
```bash
# For updated versions
public/images/blog/lean-principles-v2.png
public/images/blog/lean-principles-v3.png
```

## 🎯 HTML Embedding Examples

### Basic Image
```html
<img src="https://genba.kaizenacademy.education/images/blog/lean-principles.png" 
     alt="Lean Principles Diagram" 
     style="width:100%;max-width:600px;">
```

### Responsive Image
```html
<img src="https://genba.kaizenacademy.education/images/marketing/course-promo.jpg" 
     alt="Course Promotion" 
     class="responsive-image"
     loading="lazy">
```

### Figure with Caption
```html
<figure>
  <img src="https://genba.kaizenacademy.education/images/tutorials/workflow-diagram.svg" 
       alt="Workflow Diagram">
  <figcaption>Genba Ikigai workflow process</figcaption>
</figure>
```

## 📝 Asset Tracking Template

Keep this in your `ASSETS_HYPERLINKS.md`:

```markdown
### Blog Images
- [ ] lean-principles.png - Added 2024-04-04
- [ ] kaizen-methodology.jpg - Added 2024-04-04
- [ ] genba-workspace.png - Planned

### Marketing Images  
- [ ] course-promo.jpg - Added 2024-04-04
- [ ] workshop-banner.png - Planned
```

## 🔍 Current Assets Summary

### ✅ Already Working
```
Root Level (from public/):
- PDCA.png
- Genba Ikigai.png
- app-logo.png
- kenji.png
- Sarah.png

/assets/ (hashed, code-imported):
- hero-book-floating-water-[hash].jpg
- red-bus-card-[hash].jpg
- ikigai-map-illustration-[hash].jpg
```

### 🆕 Ready for New Content
```
public/images/blog/     ← Add blog images here
public/images/social/   ← Add social media images here  
public/images/marketing/← Add marketing images here
public/images/general/  ← Add general images here
```

## 🚨 Important Notes

### ⚠️ What NOT to Do
- **Don't** put images in `assets/Images/` (they won't be accessible via URL)
- **Don't** use spaces in filenames (`my image.png` → `my-image.png`)
- **Don't** forget to deploy after adding assets

### ✅ What ALWAYS Works
1. Place image in `public/images/[category]/`
2. Commit and push to GitHub
3. Wait for Vercel deployment (1-2 minutes)
4. Use URL: `https://genba.kaizenacademy.education/images/[category]/filename`

## 🎯 Quick Reference

| Asset Type | Folder | URL Example |
|-------------|--------|-------------|
| Blog Images | `public/images/blog/` | `.../images/blog/post-image.png` |
| Social Media | `public/images/social/` | `.../images/social/cover.png` |
| Marketing | `public/images/marketing/` | `.../images/marketing/banner.jpg` |
| React Components | `src/assets/` | `.../assets/component-[hash].png` |

---

**Rule of Thumb**: If you need a direct URL for external embedding → use `public/images/`
