# iConta24 Accounting Template Setup Guide

## Quick Setup for Accounting Website

### Step 1: Update Strapi Content

1. Start Strapi: `cd strapi && bun run develop`
2. Login to admin panel at http://localhost:1337/admin
3. Go to **Content Manager > Global**

### Step 2: Update Global Settings

Update the following in Global settings:

#### Navbar
- **Left Navigation Items:**
  - Acasă → /
  - Servicii → /servicii
  - Înființare Firmă → /infiintare-firma
  - Echipa → /echipa
  - Blog → /blog
  - Contact → /contact

- **Right Navigation Items:**
  - Contul Meu → /contul-meu
  - Solicită Ofertă → /contact#oferta

#### Footer
- **Description:** "Contabilitatea înseamnă mai mult decât să operezi documente și să raportezi cifrele. Înseamnă să îl ajuți pe antreprenor să ia deciziile în direcția cifrelor pe care și le dorește."
- **Copyright:** Copyright © 2025 iConta24
- **Company Info:** FACILITY ACCOUNT SRL • CUI 37210737

### Step 3: Create Pages

Create the following pages in **Content Manager > Pages**:

1. **Homepage**
   - Title: Acasă
   - Slug: (leave empty for homepage)
   - Locale: ro

2. **Services Page**
   - Title: Servicii
   - Slug: servicii
   - Locale: ro

3. **Company Registration**
   - Title: Înființare Firmă
   - Slug: infiintare-firma
   - Locale: ro

4. **Team Page**
   - Title: Echipa
   - Slug: echipa
   - Locale: ro

5. **Contact Page**
   - Title: Contact
   - Slug: contact
   - Locale: ro

6. **Blog Page**
   - Title: Blog
   - Slug: blog
   - Locale: ro

7. **My Account Page**
   - Title: Contul Meu
   - Slug: contul-meu
   - Locale: ro

### Step 4: Export New Seed Data

After creating all content:

```bash
cd strapi
bun run strapi export --no-encrypt -f ./data/accounting_seed
```

Then update package.json to use the new seed:
```json
"seed": "cd strapi && bun run strapi import -f ./data/accounting_seed.tar.gz --force"
```

### Step 5: Test the Website

1. Run both services: `bun run dev`
2. Visit http://localhost:3000
3. You should see the professional accounting website with Romanian content

## Current Implementation

The website currently shows:
- ✅ Professional blue theme (#0099ff)
- ✅ Accounting-focused homepage
- ✅ Romanian navigation
- ✅ Professional footer with company info
- ✅ Clean, modern design

## Future Enhancements

To complete the accounting template:
1. Create specific page designs for Services, Team, Contact, etc.
2. Add blog functionality
3. Implement "Contul Meu" client portal
4. Add contact forms
5. Create service-specific landing pages

## Notes

- The current design uses static content in the React components
- Strapi is used for navigation and page routing
- Dynamic zones from Strapi can still be used if needed
- All text is currently in Romanian as per the iConta24 website