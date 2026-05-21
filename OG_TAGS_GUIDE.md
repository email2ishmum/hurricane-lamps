# Open Graph Tags Implementation Guide

## What Was Done ✅

Added dynamic Open Graph (OG) tags to your Hurricane Lamps website for better social media sharing previews.

---

## Files Modified

### 1. **index.html** (Root HTML)
**Location**: `index.html`  
**What changed**: Added OG meta tags to `<head>`

```html
<!-- Open Graph Tags -->
<meta property="og:title" content="Hurricane Lamps | Modern Illumination" />
<meta property="og:description" content="Distinctive hurricane lamps for modern spaces. Handcrafted elegance delivered across Bangladesh." />
<meta property="og:image" content="https://hurricane-lamps.com/og-image.jpg" />
<meta property="og:url" content="https://hurricane-lamps.com" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Hurricane Lamps" />

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Hurricane Lamps | Modern Illumination" />
<meta name="twitter:description" content="Distinctive hurricane lamps for modern spaces. Handcrafted elegance delivered across Bangladesh." />
<meta name="twitter:image" content="https://hurricane-lamps.com/og-image.jpg" />
```

---

### 2. **src/utils/seo.ts** (NEW FILE)
**Location**: `src/utils/seo.ts`  
**Purpose**: Utility function to dynamically update OG tags when page/product changes

This file exports `setOGTags()` function that:
- Updates meta tags dynamically (works with React Router)
- Creates tags if they don't exist
- Updates all 9 OG/Twitter tags at once

---

### 3. **src/pages/Home.tsx**
**Changes**:
- Imported `setOGTags` from `src/utils/seo`
- Added `useEffect` hook to set OG tags on page load

```typescript
useEffect(() => {
  setOGTags({
    title: 'Hurricane Lamps | Modern Illumination',
    description: 'Distinctive hurricane lamps for modern spaces. Handcrafted elegance delivered across Bangladesh.',
    image: 'https://hurricane-lamps.com/og-image.jpg',
    url: 'https://hurricane-lamps.com',
    type: 'website',
  });
  // ... rest of effect
}, []);
```

---

### 4. **src/pages/ProductDetail.tsx**
**Changes**:
- Imported `setOGTags`
- Added dynamic OG tags for each product

```typescript
useEffect(() => {
  setLoading(true);
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      const found = data.find((p: any) => p.id === id || String(p.id) === id);
      if (found) {
        setProduct(found);
        setActiveImage(found.mainImage);
        setSelectedColor(found.colors[0]);
        
        // Set product-specific OG tags
        setOGTags({
          title: `${found.name} | Hurricane Lamps`,
          description: found.description || `Beautiful ${found.name} from Hurricane Lamps`,
          image: found.mainImage,
          url: `https://hurricane-lamps.com/product/${id}`,
          type: 'product',
        });
      }
    })
    // ... rest of effect
}, [id]);
```

---

### 5. **src/pages/About.tsx**
**Changes**:
- Imported `useEffect` & `setOGTags`
- Added OG tags for About page

```typescript
useEffect(() => {
  setOGTags({
    title: 'About Us | Hurricane Lamps',
    description: 'Learn about Hurricane Lamps - where light meets emotion. Handcrafted hurricane lamps designed for modern spaces.',
    image: 'https://hurricane-lamps.com/og-image.jpg',
    url: 'https://hurricane-lamps.com/about',
    type: 'website',
  });
}, []);
```

---

### 6. **src/pages/Checkout.tsx**
**Changes**:
- Imported `setOGTags`
- Added OG tags for Checkout page

```typescript
useEffect(() => {
  setOGTags({
    title: 'Checkout | Hurricane Lamps',
    description: 'Complete your purchase of handcrafted hurricane lamps from Hurricane Lamps.',
    image: 'https://hurricane-lamps.com/og-image.jpg',
    url: 'https://hurricane-lamps.com/checkout',
    type: 'website',
  });
}, []);
```

---

### 7. **src/pages/ReturnPolicy.tsx**
**Changes**:
- Imported `useEffect` & `setOGTags`
- Added OG tags for Return Policy page

```typescript
useEffect(() => {
  setOGTags({
    title: 'Return Policy | Hurricane Lamps',
    description: 'Read our return policy for Hurricane Lamps products. Easy returns and customer satisfaction guaranteed.',
    image: 'https://hurricane-lamps.com/og-image.jpg',
    url: 'https://hurricane-lamps.com/return-policy',
    type: 'website',
  });
}, []);
```

---

## How to Push to GitHub

### Step 1: Navigate to Your Project
```bash
cd path/to/hurricane-lamps
```

### Step 2: Check Modified Files
```bash
git status
```

You should see:
```
modified:   index.html
modified:   src/pages/About.tsx
modified:   src/pages/Checkout.tsx
modified:   src/pages/Home.tsx
modified:   src/pages/ProductDetail.tsx
modified:   src/pages/ReturnPolicy.tsx
new file:   src/utils/seo.ts
```

### Step 3: Stage All Changes
```bash
git add .
```

### Step 4: Commit with Message
```bash
git commit -m "feat: add dynamic Open Graph tags for social sharing

- Add OG meta tags to index.html for home page
- Create seo.ts utility for dynamic OG tag management
- Update all page components to set OG tags dynamically
- Home: site-level OG tags
- ProductDetail: product-specific OG tags
- About, Checkout, ReturnPolicy: page-specific OG tags
- Improves social media sharing previews"
```

### Step 5: Push to GitHub
```bash
git push origin main
```

---

## Important Notes

⚠️ **Update the Image URLs**:
- Replace `https://hurricane-lamps.com/og-image.jpg` with your actual OG image URL
- Image specs:
  - Size: 1200×630px minimum
  - Format: JPG or PNG
  - Max size: 5MB
  - Should be hosted on your domain

✅ **Test Your Changes**:
1. Run locally: `npm run dev`
2. Visit each page
3. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing)
4. Paste your live URL, check preview

📱 **Works Across Platforms**:
- Facebook
- Twitter/X
- WhatsApp
- LinkedIn
- Telegram
- Discord
- Slack

---

## What Happens Now

When someone shares a link to:
- **Home page** → Shows site title, description, and OG image
- **Product page** → Shows product name, description, and product image
- **About page** → Shows "About Us" with site description
- **Other pages** → Shows page-specific title and description

Instead of generic/broken previews, you get rich social media cards! 🎉

