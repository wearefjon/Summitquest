# 🏔️ SummitQuest Maharashtra — Master Project Brief
**Adventure Tourism Booking Marketplace**

This is the unified source of truth for SummitQuest, merging product vision, technical requirements, and system architecture into a single document.

---

## 1. Product Requirements Document (PRD)

### 1.1 Vision
SummitQuest is the definitive digital gateway to adventure tourism in Maharashtra. It connects weekend explorers with verified local operators running treks, camping trips, water sports, and outdoor experiences across Maharashtra. It is an Airbnb-grade marketplace where discovery, trust, and delight are engineered into every interaction.

### 1.2 Core Value Propositions
- **Discovery**: Browse experiences across Maharashtra destinations (Sahyadri, Konkan, etc.).
- **Comparison**: Side-by-side pricing, itineraries, and reviews.
- **Trust**: Verified operators, secure payments, guaranteed listings, and safety certifications.
- **Simplicity**: Book in under 3 minutes with instant confirmation and digital tickets.

### 1.3 Target Users
1. **The Weekend Explorer (Primary)**: Urban professionals seeking weekend getaways. Needs minimal research friction and a trusted platform.
2. **The Adventure Operator**: Local businesses wanting a digital storefront, automated booking management, and secure payouts.
3. **Platform Admin**: Internal team managing quality control, operator onboarding, and dispute resolution.

### 1.4 Functional Scope (Phase 1 MVP)
- **Customer**: Browse & search (by category, destination, price, dates), view rich detail pages (itinerary, map, reviews), group bookings, Razorpay checkout, view booking history, and leave reviews.
- **Operator**: Registration & onboarding, listing management (availability, pricing, media), revenue dashboard, and booking management.
- **Admin**: Operator approvals, dispute resolution, user/listing management, and platform analytics.

### 1.5 Bonus AI Features
- **AI Trip Planner**: Takes user preferences and returns personalized recommendations.
- **Smart Search**: Embedding-based semantic search for experiences.

---

## 2. Technical Requirements Document (TRD)

### 2.1 Technology Stack
**Why this stack?** We are standardizing on **Next.js (Frontend) + FastAPI (Backend)** because it perfectly aligns with the already scaffolded codebase and `docker-compose` setup. This architecture cleanly separates the client and server while delivering top-tier performance for both the UI and the API.

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Query, Zustand.
- **Backend**: FastAPI (Python 3.12), SQLAlchemy 2.0, Alembic, Pydantic v2.
- **Database**: PostgreSQL 16 (Primary)
- **Cache**: Redis 7 (Session, rate limiting, and temporary data)
- **Payments**: Razorpay (India-first)
- **Media**: Cloudinary (Image CDN)
- **Email**: Resend
- **Monitoring**: Sentry

### 2.2 System Architecture
SummitQuest uses a decoupled, API-first architecture:
1. **Client Layer**: Next.js app communicating via HTTPS REST to the backend.
2. **Backend API**: FastAPI handling business logic, authentication, and database transactions.
3. **Data Layer**: PostgreSQL for persistent relational data, Redis for caching availability and sessions.
4. **External Services**: Razorpay handles payment processing, triggering webhooks to FastAPI to confirm bookings. Cloudinary receives direct uploads from the frontend (signed by backend) to offload bandwidth.

### 2.3 Authentication Flow
- Customers and Operators register/login via Email/Password or Google OAuth.
- FastAPI issues JWT access and refresh tokens.
- Role-based access control (User, Operator, Admin) restricts dashboard and API routes.

### 2.4 Booking & Payment Flow
1. User selects dates and group size.
2. Next.js requests availability from FastAPI.
3. If available, FastAPI creates a `PENDING` booking and a Razorpay Order.
4. User completes payment via Razorpay checkout.
5. Razorpay sends a webhook (and client-side verification) to FastAPI.
6. FastAPI verifies signature, marks booking `CONFIRMED`, decrements availability, and triggers email via Celery/Background Tasks.

### 2.5 Database Entities
- **Users**: Customers, Operators, Admins
- **Operators**: Business profiles linked to Users.
- **Experiences**: Adventure listings (linked to Categories and Destinations).
- **Availability**: Date-based slot tracking per experience.
- **Bookings**: Transaction records linking Users and Experiences.
- **Payments**: Razorpay transaction logs.
- **Reviews**: Post-booking customer feedback.

---

## 3. Success Metrics
- **Performance**: Mobile LCP < 2.5s, 99.9% Uptime, zero critical security vulnerabilities.
- **Business**: Acquire 150 verified operators, 10,000 customers, and achieve platform GMV targets within Year 1. Reduce WhatsApp booking friction to zero.

*End of Master Brief.*
