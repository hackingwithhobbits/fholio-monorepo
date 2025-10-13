# **FHOLIO - Music Investment Platform**

A revolutionary platform connecting music fans with artists through investment opportunities. Fans can invest in tracks, artists can fund their projects, and both share in the streaming revenue success.

---

## **📋 Table of Contents**

- [About](#about)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running the Platform](#running-the-platform)
- [Development Workflow](#development-workflow)
- [Key Features](#key-features)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## **🎵 About**

Fholio is the world's first music stock exchange where:
- **Fans** invest in tracks they believe in and earn returns from streaming royalties
- **Artists** raise funding for their music while maintaining creative control
- **Everyone wins** when tracks succeed on streaming platforms

### **Core Concept**
Instead of just streaming music, fans can become stakeholders. When a track performs well on Spotify, Apple Music, and other platforms, investors receive dividends proportional to their shares.

---

## **🏗️ Architecture**

Fholio uses a **monorepo architecture** with separate applications for different concerns:

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│          (Next.js 15 + React + Tailwind)                │
│         Browse, Invest, Track Portfolio                 │
└────────────────┬────────────────────────────────────────┘
                 │ REST API
                 ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND API                        │
│              (Express + TypeScript)                     │
│        Artists, Tracks, Investments, Analytics          │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│   SUPABASE   │  │   CHARTMETRIC    │
│   Database   │  │   Music Data API │
│   (Postgres) │  │                  │
└──────┬───────┘  └────────┬─────────┘
       │                   │
       └───────┬───────────┘
               ▼
┌─────────────────────────────────────────────────────────┐
│                    CRON JOBS                            │
│           (Node.js + node-cron)                         │
│      Nightly sync: Chartmetric → Supabase              │
└─────────────────────────────────────────────────────────┘
```

**Design Principles:**
- **Separation of Concerns**: Frontend, API, and background jobs are isolated
- **Shared Code**: Common utilities and types are shared via workspace packages
- **Type Safety**: End-to-end TypeScript for fewer bugs
- **Scalability**: Each service can be deployed and scaled independently

---

## **🛠️ Tech Stack**

### **Frontend**
- **Framework**: Next.js 15 (App Router, React Server Components)
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **State Management**: React Context + Hooks
- **UI Components**: Radix UI primitives (Accordion, Dialog, Dropdown, etc.)
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form

### **Backend**
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database Client**: Supabase JS SDK
- **Authentication**: Supabase Auth (JWT-based)
- **Validation**: Zod (type-safe validation)
- **API Documentation**: OpenAPI/Swagger (planned)

### **Background Jobs**
- **Scheduler**: node-cron (for nightly sync jobs)
- **Rate Limiting**: Bottleneck + p-limit
- **HTTP Client**: Axios
- **API Integration**: Chartmetric REST API

### **Database & Infrastructure**
- **Database**: PostgreSQL (via Supabase)
- **Real-time**: Supabase Realtime subscriptions
- **Storage**: Supabase Storage (for track uploads, cover art)
- **Auth**: Supabase Auth (email, OAuth providers)
- **Row Level Security**: PostgreSQL RLS policies

### **Development Tools**
- **Monorepo**: pnpm workspaces
- **TypeScript**: Shared types across all workspaces
- **Code Quality**: ESLint + Prettier
- **CI/CD**: GitHub Actions (planned)

---

## **📁 Project Structure**

```
fholio/
├── apps/
│   ├── frontend/              # Next.js web application
│   │   ├── src/
│   │   │   ├── app/          # App Router pages
│   │   │   ├── components/   # React components
│   │   │   ├── lib/          # Utilities, API clients
│   │   │   └── styles/       # Global styles
│   │   ├── public/           # Static assets
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── backend/               # Express API server
│   │   ├── src/
│   │   │   ├── routes/       # API endpoints
│   │   │   ├── services/     # Business logic
│   │   │   ├── middleware/   # Auth, CORS, error handling
│   │   │   └── index.ts      # Server entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── cron-jobs/             # Background sync jobs
│       ├── src/
│       │   ├── jobs/         # Scheduled tasks
│       │   │   ├── chartmetric-sync.job.ts
│       │   │   └── job-scheduler.ts
│       │   ├── services/     # Chartmetric API, sync logic
│       │   │   ├── chartmetric/
│       │   │   │   ├── chartmetric-api.service.ts
│       │   │   │   ├── chartmetric-sync.service.ts
│       │   │   │   └── rate-limiter.ts
│       │   │   └── database/
│       │   │       └── batch-writer.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── database/              # Shared database layer
│   │   ├── src/
│   │   │   ├── client.ts     # Supabase client setup
│   │   │   ├── queries/      # Reusable queries
│   │   │   │   ├── artists.ts
│   │   │   │   ├── tracks.ts
│   │   │   │   ├── campaigns.ts
│   │   │   │   ├── investments.ts
│   │   │   │   └── snapshots.ts
│   │   │   └── types.ts      # Database types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── shared/                # Shared utilities
│       ├── src/
│       │   ├── utils/        # Helper functions
│       │   ├── config/       # Shared configuration
│       │   └── types/        # Common types
│       ├── package.json
│       └── tsconfig.json
│
├── supabase/                  # Database schema & migrations
│   ├── config.toml           # Supabase CLI config
│   ├── migrations/           # SQL migration files
│   │   ├── 20240101000000_create_profiles.sql
│   │   ├── 20240101000001_create_artists.sql
│   │   ├── 20240101000002_create_tracks.sql
│   │   ├── 20240101000003_create_campaigns.sql
│   │   ├── 20240101000004_create_investments.sql
│   │   ├── 20240101000005_create_chartmetric_snapshots.sql
│   │   ├── 20240101000006_create_dividends.sql
│   │   └── 20240101000007_create_functions.sql
│   └── seed.sql              # Sample/test data
│
├── .env.example               # Environment variables template
├── .env                       # Your secrets (gitignored)
├── .gitignore
├── package.json               # Root workspace config
├── pnpm-workspace.yaml        # pnpm workspace definition
├── pnpm-lock.yaml             # Dependency lock file
├── tsconfig.json              # Base TypeScript config
└── README.md                  # This file
```

---

## **✅ Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js**: v20.0.0 or higher ([Download](https://nodejs.org/))
- **pnpm**: v8.0.0 or higher (Package manager)
  ```bash
  npm install -g pnpm
  # or
  corepack enable && corepack prepare pnpm@latest --activate
  ```
- **Supabase CLI**: For database management
  ```bash
  npm install -g supabase
  # or
  brew install supabase/tap/supabase  # macOS
  ```
- **Git**: For version control
- **Supabase Account**: [Sign up](https://supabase.com) for free
- **Chartmetric Account**: [Sign up](https://chartmetric.com) for API access

---

## **🚀 Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/fholio.git
cd fholio
```

### **2. Install Dependencies**

```bash
# Install all workspace dependencies
pnpm install
```

This will install dependencies for:
- Frontend (Next.js, React, Radix UI, etc.)
- Backend (Express, Supabase client)
- Cron Jobs (node-cron, Chartmetric client)
- Shared packages (database queries, utilities)

### **3. Set Up Environment Variables**

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your preferred editor
```

See [Environment Setup](#environment-setup) section for details.

### **4. Set Up Database**

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push

# (Optional) Seed with sample data
supabase db reset
```

See [Database Setup](#database-setup) section for detailed instructions.

### **5. Run the Platform**

```bash
# Run everything in parallel
pnpm dev

# Or run services individually:
pnpm dev:frontend   # Frontend at http://localhost:3000
pnpm dev:backend    # Backend at http://localhost:3001
pnpm dev:cron       # Cron jobs (background process)
```

---

## **🔐 Environment Setup**

### **Required Environment Variables**

Create a `.env` file in the project root with the following variables:

```bash
# ==============================================
# SUPABASE CONFIGURATION
# ==============================================
# Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database connection string (for direct access if needed)
# Get from: https://app.supabase.com/project/YOUR_PROJECT/settings/database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres

# ==============================================
# CHARTMETRIC API
# ==============================================
# Get these from: https://api.chartmetric.com/api/token

CHARTMETRIC_API_KEY=your_chartmetric_api_key_here
CHARTMETRIC_REFRESH_TOKEN=your_chartmetric_refresh_token_here

# ==============================================
# SERVER CONFIGURATION
# ==============================================

PORT=3001
NODE_ENV=development

# Frontend URL (for CORS configuration)
FRONTEND_URL=http://localhost:3000

# ==============================================
# OPTIONAL: EXTERNAL SERVICES
# ==============================================

# Payment processing (Stripe)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email service (SendGrid, Resend, etc.)
# EMAIL_API_KEY=...
# EMAIL_FROM=noreply@fholio.com

# Analytics (Mixpanel, PostHog, etc.)
# ANALYTICS_API_KEY=...
```

### **Environment Variables by Service**

| Variable | Used By | Purpose |
|----------|---------|---------|
| `SUPABASE_URL` | All | Database connection |
| `SUPABASE_ANON_KEY` | Frontend | Client-side queries |
| `SUPABASE_SERVICE_KEY` | Backend, Cron | Server-side admin access |
| `CHARTMETRIC_API_KEY` | Cron Jobs | Music analytics data |
| `PORT` | Backend | API server port |
| `FRONTEND_URL` | Backend | CORS configuration |

### **Getting Your Credentials**

#### **Supabase:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create new)
3. Go to **Settings** → **API**
4. Copy:
   - Project URL → `SUPABASE_URL`
   - `anon` `public` key → `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_KEY` ⚠️ **Keep secret!**

#### **Chartmetric:**
1. Go to [Chartmetric API](https://api.chartmetric.com)
2. Sign up for an account
3. Navigate to API settings
4. Generate API key and refresh token
5. Copy both to your `.env` file

---

## **🗄️ Database Setup**

### **Option A: Using Supabase CLI (Recommended)**

This approach uses SQL migrations for version-controlled database schema.

#### **Step 1: Initialize Supabase Locally**

```bash
# Initialize Supabase in your project
supabase init

# This creates:
# - supabase/config.toml
# - supabase/migrations/
# - supabase/seed.sql
```

#### **Step 2: Link to Remote Project**

```bash
# Login to Supabase (opens browser)
supabase login

# Link to your cloud project
supabase link --project-ref YOUR_PROJECT_REF

# Get your project ref from the Supabase dashboard URL:
# https://app.supabase.com/project/[THIS-IS-YOUR-REF]/...
```

#### **Step 3: Create Migration Files**

```bash
# Create a new migration
supabase migration new create_initial_schema

# This creates:
# supabase/migrations/20240115000000_create_initial_schema.sql

# Edit the file and add your schema
```

#### **Step 4: Apply Migrations**

```bash
# Option 1: Push to remote database (production)
supabase db push

# Option 2: Apply to local database (development)
supabase db reset

# Check migration status
supabase migration list
```

#### **Step 5: Verify Tables**

```bash
# Open Supabase Studio locally
supabase start

# Or visit your cloud dashboard:
# https://app.supabase.com/project/YOUR_REF/editor
```

---

### **Option B: Using Supabase Dashboard (Quick Start)**

For rapid prototyping or if you prefer a GUI:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **SQL Editor**
4. Click **New Query**
5. Paste your SQL schema
6. Click **Run**

⚠️ **Note**: This approach doesn't version control your schema. Use migrations for production.

---

### **Database Schema Overview**

The platform uses the following core tables:

#### **User & Artist Management**
- `profiles` - User profiles (extends Supabase auth.users)
- `artists` - Artist profiles with streaming stats
- `artist_verifications` - Artist verification status

#### **Music Catalog**
- `tracks` - Individual songs/tracks
- `campaigns` - Fundraising campaigns for tracks
- `track_analytics` - Daily streaming analytics per track

#### **Investment & Trading**
- `investments` - User investments in tracks
- `transactions` - All buy/sell transactions
- `dividends` - Dividend payment records
- `dividend_payments` - Individual dividend distributions

#### **Analytics & Performance**
- `chartmetric_snapshots` - Daily cache of Chartmetric data
- `price_history` - Historical share prices
- `streaming_revenue` - Revenue per platform

#### **Supporting Tables**
- `follows` - User follows artists
- `favorites` - User favorites tracks
- `notifications` - User notifications
- `sync_logs` - Cron job execution logs

See `supabase/migrations/` for detailed schema definitions.

---

### **Database Functions**

We use PostgreSQL functions for complex queries:

```sql
-- Get artists prioritized by activity (for sync jobs)
SELECT * FROM get_prioritized_artists(
  high_priority_days := 1,
  medium_priority_days := 3,
  low_priority_days := 7
);

-- Get tracks that need syncing
SELECT * FROM get_prioritized_tracks(
  high_priority_days := 1,
  medium_priority_days := 3,
  low_priority_days := 7
);
```

These functions are defined in `supabase/migrations/*_create_functions.sql`.

---

## **▶️ Running the Platform**

### **Development Mode (All Services)**

```bash
# Run everything in parallel
pnpm dev

# This starts:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
# - Cron Jobs: background process
```

### **Individual Services**

```bash
# Frontend only
pnpm dev:frontend
# or
cd apps/frontend && pnpm dev

# Backend only
pnpm dev:backend
# or
cd apps/backend && pnpm dev

# Cron jobs only
pnpm dev:cron
# or
cd apps/cron-jobs && pnpm dev
```

### **Production Build**

```bash
# Build all services
pnpm build

# Start production servers
pnpm start:frontend   # Frontend (Next.js)
pnpm start:backend    # Backend API
pnpm start:cron       # Cron jobs
```

---

## **🔧 Development Workflow**

### **Adding Dependencies**

```bash
# Add to frontend
pnpm --filter @fholio/frontend add package-name

# Add to backend
pnpm --filter @fholio/backend add package-name

# Add to shared package
pnpm --filter @fholio/database add package-name

# Add dev dependency
pnpm --filter @fholio/frontend add -D package-name
```

### **Creating a New Database Query**

1. Add query function to `packages/database/src/queries/`
2. Export it from `packages/database/src/index.ts`
3. Use it in backend or cron jobs:

```typescript
// packages/database/src/queries/artists.ts
export async function getArtistById(artistId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', artistId)
    .single();
  if (error) throw error;
  return data;
}

// apps/backend/src/routes/artists.ts
import { getArtistById } from '@fholio/database';

router.get('/:id', async (req, res) => {
  const artist = await getArtistById(req.params.id);
  res.json(artist);
});
```

### **Creating a New API Endpoint**

1. Create route file in `apps/backend/src/routes/`
2. Import in `apps/backend/src/index.ts`
3. Test with curl or Postman

```typescript
// apps/backend/src/routes/trending.ts
import { Router } from 'express';
import { getTrendingTracks } from '@fholio/database';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const tracks = await getTrendingTracks();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending tracks' });
  }
});

export default router;

// apps/backend/src/index.ts
import trendingRoutes from './routes/trending';
app.use('/api/trending', trendingRoutes);
```

### **Running Manual Sync**

```bash
# Run Chartmetric sync manually (instead of waiting for cron)
cd apps/cron-jobs
pnpm sync:manual

# This executes the sync job immediately
```

### **Checking Sync Logs**

```sql
-- Query sync logs in Supabase
SELECT * FROM sync_logs 
ORDER BY completed_at DESC 
LIMIT 10;

-- Check for failed syncs
SELECT * FROM sync_logs 
WHERE status = 'failed' 
ORDER BY completed_at DESC;
```

### **Database Migrations**

```bash
# Create new migration
supabase migration new add_new_feature

# Edit the generated .sql file
# Then apply:
supabase db push

# Rollback (if needed)
supabase db reset
```

---

## **✨ Key Features**

### **For Investors/Fans**
- 🔍 **Browse & Discover** - Explore tracks by genre, trending, rising artists
- 💰 **Invest in Music** - Buy shares in tracks you believe in
- 📊 **Track Portfolio** - Real-time portfolio value and ROI tracking
- 💵 **Earn Dividends** - Receive payouts from streaming royalties
- 📈 **Performance Charts** - Historical streaming growth visualization
- 🔔 **Notifications** - Get alerted on investments, dividends, price changes

### **For Artists**
- 🚀 **Launch Campaigns** - Raise funding by offering shares in tracks
- 📊 **Analytics Dashboard** - Detailed streaming and earnings analytics
- 👥 **Backer Management** - See who invested and engage with fans
- 💰 **Track Earnings** - Monitor revenue and dividend distributions
- 🔗 **Distribution Integration** - Connect Spotify, Apple Music via distributors
- 📢 **Campaign Updates** - Post updates to your investors

### **Platform Features**
- 🔒 **Secure Authentication** - Supabase Auth with email & OAuth
- 💳 **Payment Processing** - Stripe integration (planned)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Live price and portfolio updates
- 🔐 **Row Level Security** - PostgreSQL RLS for data security

---

## **📚 API Documentation**

### **Base URL**
```
Development: http://localhost:3001/api
Production: https://api.fholio.com/api
```

### **Authentication**
All authenticated endpoints require a JWT token from Supabase Auth:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### **Core Endpoints**

#### **Artists**
```
GET    /api/artists           # List all artists
GET    /api/artists/:id       # Get artist details with stats
POST   /api/artists           # Create artist profile (auth required)
PUT    /api/artists/:id       # Update artist (auth required)
```

#### **Tracks**
```
GET    /api/tracks            # List all tracks
GET    /api/tracks/:id        # Get track details
GET    /api/tracks/trending   # Get trending tracks
POST   /api/tracks            # Upload new track (auth required)
```

#### **Campaigns**
```
GET    /api/campaigns         # List active campaigns
GET    /api/campaigns/:id     # Get campaign details
POST   /api/campaigns         # Create campaign (artist only)
PUT    /api/campaigns/:id     # Update campaign (artist only)
```

#### **Investments**
```
GET    /api/investments       # Get user's investments (auth required)
POST   /api/investments       # Make new investment (auth required)
GET    /api/portfolio         # Get portfolio summary (auth required)
```

### **Response Format**

Success:
```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

Error:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

---

## **🚀 Deployment**

### **Frontend (Vercel - Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from root
cd apps/frontend
vercel

# Or connect GitHub repo for automatic deployments
```

**Environment Variables on Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`


# Using Render
# Connect GitHub repo via dashboard
# Set build command: pnpm --filter @fholio/backend build
# Set start command: pnpm --filter @fholio/backend start
```

**Environment Variables:**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `PORT`
- `FRONTEND_URL`

### **Cron Jobs (Separate Service)**

Deploy cron jobs separately as a background service:

```bash
# Using Railway (Worker process)
# Procfile:
worker: pnpm --filter @fholio/cron-jobs start

# Or use managed cron (GitHub Actions, Render Cron Jobs)
```

### **Database (Supabase - Already Hosted)**

Your database is already hosted on Supabase. Just ensure migrations are applied:

```bash
# Push latest migrations to production
supabase link --project-ref PROD_PROJECT_REF
supabase db push
```

---

## **🤝 Contributing**

We welcome contributions! Please follow these guidelines:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write tests (if applicable)
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Code Style**
- Follow existing code conventions
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic

### **Testing**
```bash
# Run tests (when implemented)
pnpm test

# Run linter
pnpm lint
```


## **🆘 Support**

### **Common Issues**

**Database connection fails:**
```bash
# Check your SUPABASE_URL and keys in .env
# Verify Supabase project is running
supabase status
```

**Chartmetric API rate limit:**
```bash
# The sync job is designed to respect rate limits
# Check sync_logs table for errors
# Consider reducing sync frequency if needed
```

**Port already in use:**
```bash
# Change PORT in .env
# Or kill the process:
lsof -ti:3001 | xargs kill -9
```

### **Get Help**
- 📧 Email: support@fholio.com
- 💬 Discord: [Join our community](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/fholio/issues)
- 📖 Docs: [Full Documentation](#)

---

## **🙏 Acknowledgments**

- [Supabase](https://supabase.com) - Database and authentication
- [Chartmetric](https://chartmetric.com) - Music analytics data
- [Next.js](https://nextjs.org) - React framework
- [Radix UI](https://radix-ui.com) - Accessible component primitives
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components

---

## **📊 Project Status**

- [x] Core architecture setup
- [x] Database schema design
- [x] Backend API scaffolding
- [x] Chartmetric integration
- [x] Nightly sync jobs
- [ ] Payment processing (Stripe)
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Secondary market trading

**Built with ❤️ by the Fholio Team**

**Star ⭐ this repo if you find it helpful!**