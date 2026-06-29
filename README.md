# SummitQuest Maharashtra

Adventure tourism booking marketplace for Maharashtra — customers discover and book adventures, operators manage listings, admins moderate the platform.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, TypeScript, Tailwind, shadcn/ui |
| Backend | FastAPI, SQLAlchemy, Alembic |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Payments | Razorpay |
| Images | Cloudinary |
| Email | Resend |

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
- [x] Backend auth (register/login)
- [x] Database migrations (users table)
- [x] Frontend landing shell + route structure
- [ ] UI design integration (awaiting design files)
- [ ] Adventures, search, booking flow
- [ ] Operator & admin dashboards
- [ ] Razorpay, Cloudinary, email

## Documentation

Planning docs are consolidated in the repo root (`SummitQuest_Master_Brief.md`). Additional specs will be added as they are provided.
