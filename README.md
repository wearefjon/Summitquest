# SummitQuest Maharashtra

Adventure tourism booking marketplace for Maharashtra — customers discover and book adventures, operators manage listings, admins moderate the platform.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, TypeScript, Tailwind, shadcn/ui |
| Backend | FastAPI, SQLAlchemy, Alembic |
| Database | PostgreSQL 16 (via Supabase) |
| Cache | Redis 7 |
| Payments | Stripe |
| Images | Cloudinary |
| Email | Resend / SMTP |
| Auth | Supabase Auth (OAuth + Email) |

## Project structure

```
├── frontend/          # Next.js web app (port 3000)
├── backend/           # FastAPI API (port 8000)
├── docker-compose.yml # Postgres + Redis + API
└── SummitQuest_Master_Brief.md # Master planning document
```

## Quick start

### 1. Start database services

```bash
docker compose up postgres redis -d
```

### 2. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### 3. Frontend

```bash
cd frontend
copy .env.local.example .env.local
npm install
npm run dev
```

App: http://localhost:3000

## Environment variables

See `backend/.env.example` and `frontend/.env.local.example`.

## Current build status

- [x] Monorepo scaffold
- [x] Backend auth (register/login) with Supabase
- [x] Database migrations & schema setup
- [x] Frontend landing shell + route structure
- [x] Dynamic beautiful UI design integration
- [x] Adventures, search, booking flow
- [x] Operator & Admin dashboards
- [x] Stripe Payments integration
- [x] Cloudinary image uploads
- [x] Email notifications (Booking & Approval)
- [x] Security hardening (Rate limiting, auth guards)
- [x] Tech debt cleanup

## Documentation

Planning docs are consolidated in the repo root (`SummitQuest_Master_Brief.md`). Additional specs will be added as they are provided.
