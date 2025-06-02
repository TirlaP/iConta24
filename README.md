# iConta24 - Contabilitate Digitală

![iConta24](./LaunchPad.jpg)

Modern JAMstack application for Romanian accounting services built with Next.js 14 and Strapi v5.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with brand colors
- **Interactive Team Section**: Team member cards with detailed drawer views
- **Dynamic Services**: Fully customizable service offerings from Strapi CMS
- **Blog System**: Category filtering, search, and modern article layouts
- **Multilingual**: Romanian/English support with i18n
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Mobile Responsive**: Works perfectly on all devices

## 🛠 Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Tabler Icons, Lucide React
- **Package Manager**: Bun

### Backend (Strapi)
- **CMS**: Strapi v5
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Package Manager**: Bun

## 📦 Project Structure

```
├── next/                    # Next.js frontend
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   │   ├── dynamic-zone/   # Strapi dynamic zone components
│   │   ├── sections/       # Page sections
│   │   └── ui/            # UI components
│   └── lib/               # Utilities and helpers
├── strapi/                 # Strapi CMS backend
│   ├── config/            # Strapi configuration
│   ├── src/               # Custom code
│   │   ├── api/           # Content types
│   │   └── components/    # Strapi components
│   └── data/              # Seed data
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Bun (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/iconta24.git
   cd iconta24
   ```

2. **Install dependencies**
   ```bash
   bun run setup
   ```

3. **Start development servers**
   ```bash
   bun run dev
   ```

This will start:
- Strapi CMS: http://localhost:1337
- Next.js frontend: http://localhost:3000

### First Time Setup

1. **Create Strapi admin account**
   - Visit http://localhost:1337/admin
   - Create your admin user

2. **Import demo data (optional)**
   ```bash
   cd strapi
   bun run seed
   ```

3. **Upload team images**
   - Go to Strapi Media Library
   - Upload team member photos
   - Attach to team members in Content Manager

## 📚 Documentation

- [Quick Setup Guide](QUICK_SETUP.md) - Get started in 5 minutes
- [Accounting Setup](ACCOUNTING_SETUP.md) - Romanian accounting configuration
- [Deployment Guide](DEPLOYMENT.md) - Deploy to production
- [Claude Code Documentation](CLAUDE.md) - Development guidelines

## 🌐 Deployment

### Recommended Stack:
- **Frontend**: Vercel (free tier)
- **Backend**: Railway or Render (free tier)
- **Database**: PostgreSQL (included with hosting)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🎨 Key Components

### Team Section
- Interactive member cards
- Half-screen drawer with member details
- Navigation between team members
- Leave status and contact information

### Services Section
- Dynamic service offerings from Strapi
- Pricing and feature comparison
- Icon mapping and highlighting

### Blog System
- Category filtering and search
- Modern article layouts
- Related articles suggestions

## 🛡 Content Management

### Page Types:
- **Homepage**: Hero, features, services, testimonials
- **Services**: Detailed service offerings
- **Team**: Interactive team member showcase
- **Blog**: Article listings and individual posts
- **Contact**: Contact forms and information

### Dynamic Zones:
- Hero sections
- Feature grids
- Team displays
- Service offerings
- Testimonials
- Call-to-action sections

## 🔧 Customization

### Brand Colors
The application uses a professional color palette defined in `tailwind.config.ts`:
- Primary: Blue tones for trust and professionalism
- Accent: Darker blue for contrast
- Success/Warning: Status indicators

### Content Types
All content is managed through Strapi:
- Pages with dynamic zones
- Articles with categories
- Team members with images
- Global settings (navbar, footer)

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with App Router
- **SEO**: Server-side rendering with metadata

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Strapi LaunchPad](https://github.com/strapi/LaunchPad) as foundation
- UI/UX improvements and Romanian localization
- Enhanced with modern design patterns

---

**iConta24** - Digitalizează-ți procesul de contabilitate! 🚀