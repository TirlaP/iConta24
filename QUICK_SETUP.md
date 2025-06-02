# 🚀 Quick Setup for iConta24 Accounting Website

## Step 1: Generate Accounting Data
```bash
cd strapi
bun run seed:accounting
```

This creates JSON files with all the Romanian accounting content.

## Step 2: Start Strapi
```bash
bun run develop
```

## Step 3: Manual Import (5 minutes)

1. **Go to Strapi Admin**: http://localhost:1337/admin

2. **Update Global Settings**:
   - Navigate to: `Content Manager > Global`
   - Copy content from: `strapi/data/accounting/global.json`
   - Paste into the Global entry
   - Save & Publish

3. **Create Homepage**:
   - Navigate to: `Content Manager > Pages`
   - Click "Create new entry"
   - Copy content from: `strapi/data/accounting/homepage.json`
   - Fill in the fields
   - Save & Publish

4. **Start Next.js**:
   ```bash
   cd ../next
   bun run dev
   ```

5. **Visit**: http://localhost:3000

## ✅ Result

You'll see the beautiful accounting website with:
- ✅ Romanian content from Strapi
- ✅ Professional design
- ✅ Proper navigation
- ✅ Dynamic content management

## 🔄 Alternative: Quick Manual Setup

Instead of JSON import, you can manually update:

### Global Settings:
- **Left Navigation**: Acasă, Servicii, Înființare Firmă, Echipa, Blog, Contact
- **Right Navigation**: Contul Meu, Solicită Ofertă
- **Footer Description**: "Contabilitatea înseamnă mai mult..."

### Homepage Dynamic Zone:
1. **Hero Section**:
   - Heading: "Digitalizează-ți procesul de contabilitate!"
   - Subheading: "Soluții moderne pentru afacerea ta"
   - Description: "Folosind noile tehnologii..."

2. **Features Section**:
   - Add 4 feature cards: Simple, Smart, Support, Safe

3. **Testimonials Section**:
   - Add customer testimonials

## 🎯 Pro Tip

The website will work beautifully even with minimal content thanks to the fallback design. You can gradually add more content as needed!