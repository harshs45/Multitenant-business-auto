# BotForge Backend

> No-code AI chatbot generator for businesses — production-ready REST API

## Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** 16+ / Neon or **MySQL** 8.x running locally
- **Redis** (optional — used for caching & rate limiting)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and set your MySQL credentials and JWT secrets
```

If you want to use Neon instead of local MySQL, set `DATABASE_URL` in `.env` to your Neon Postgres connection string and keep the MySQL variables as fallback.

### 3. Create Database

For PostgreSQL (Neon) you can create a database in the Neon console, then set `DATABASE_URL` in `.env`.

For local MySQL, use:

```sql
CREATE DATABASE botforge_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run Migrations

```bash
npm run migrate
```

### 5. Seed Demo Data

```bash
npm run seed
```

### 6. Start Dev Server

```bash
npm run dev
```

Server starts at `http://localhost:4000`. Health check: `GET /api/v1/health`.

---

## Demo Credentials

| Field    | Value              |
| -------- | ------------------ |
| Email    | `demo@botforge.io` |
| Password | `Password123!`     |

---

## API Reference

### Auth

| Method | Endpoint                | Auth | Description          |
| ------ | ----------------------- | ---- | -------------------- |
| POST   | `/api/v1/auth/register` | No   | Register new user    |
| POST   | `/api/v1/auth/login`    | No   | Login                |
| POST   | `/api/v1/auth/refresh`  | No   | Refresh token        |
| POST   | `/api/v1/auth/logout`   | No   | Revoke refresh token |

**Register:**

```json
{ "name": "John", "email": "john@example.com", "password": "MyPass123" }
```

**Login:**

```json
{ "email": "demo@botforge.io", "password": "Password123!" }
```

**Refresh:**

```json
{ "refreshToken": "<refresh_token_from_login>" }
```

---

### Businesses

| Method | Endpoint                      | Auth | Description        |
| ------ | ----------------------------- | ---- | ------------------ |
| POST   | `/api/v1/businesses`          | Yes  | Create business    |
| GET    | `/api/v1/businesses`          | Yes  | List my businesses |
| GET    | `/api/v1/businesses/:id`      | Yes  | Get business       |
| PATCH  | `/api/v1/businesses/:id`      | Yes  | Update business    |
| GET    | `/api/v1/businesses/:id/bots` | Yes  | List bots          |

**Create Business:**

```json
{
  "name": "My Store",
  "businessType": "ecommerce",
  "website": "https://mystore.com"
}
```

---

### Form Schema (Adaptive Wizard)

| Method | Endpoint                                            | Auth | Description   |
| ------ | --------------------------------------------------- | ---- | ------------- |
| GET    | `/api/v1/form-schema?businessType=ecommerce&step=2` | Yes  | Step 2 fields |
| GET    | `/api/v1/form-schema?businessType=saas&step=4`      | Yes  | Step 4 fields |

---

### Bots

| Method | Endpoint                           | Auth | Description             |
| ------ | ---------------------------------- | ---- | ----------------------- |
| POST   | `/api/v1/bots`                     | Yes  | Create bot              |
| GET    | `/api/v1/bots/:id`                 | Yes  | Get bot (full)          |
| PATCH  | `/api/v1/bots/:id`                 | Yes  | Update bot              |
| DELETE | `/api/v1/bots/:id`                 | Yes  | Delete bot              |
| PATCH  | `/api/v1/bots/:id/business-basics` | Yes  | Step 1: basics          |
| PATCH  | `/api/v1/bots/:id/audience-config` | Yes  | Step 2: audience        |
| PATCH  | `/api/v1/bots/:id/identity`        | Yes  | Step 3: identity        |
| PATCH  | `/api/v1/bots/:id/features`        | Yes  | Step 4: features        |
| PATCH  | `/api/v1/bots/:id/theme`           | Yes  | Step 5: theme           |
| POST   | `/api/v1/bots/:id/publish`         | Yes  | Publish bot             |
| GET    | `/api/v1/bots/:id/preview`         | Yes  | Preview config + prompt |

**Create Bot:**

```json
{ "businessId": "<uuid>", "name": "My Bot" }
```

**Update Identity (Step 3):**

```json
{
  "botName": "HelpBot",
  "tone": "friendly",
  "welcomeMessage": "Hey! How can I help?",
  "responseLanguage": "en",
  "fallbackEmail": "support@example.com"
}
```

**Update Features (Step 4):**

```json
{
  "features": [
    "order_tracking",
    "product_recommendations",
    "lead_collection",
    "human_handoff"
  ]
}
```

**Update Theme (Step 5):**

```json
{ "themeKey": "ocean_breeze", "widgetPosition": "bottom-right" }
```

---

### Embed

| Method | Endpoint                           | Auth | Description          |
| ------ | ---------------------------------- | ---- | -------------------- |
| POST   | `/api/v1/bots/:id/embed-token`     | Yes  | Generate embed token |
| GET    | `/api/v1/bots/:id/embed-snippet`   | Yes  | Get HTML snippet     |
| GET    | `/api/v1/widget/config/:publicKey` | No   | Widget config        |

---

### Chat (Public — used by embedded widget)

| Method | Endpoint                                     | Auth | Description       |
| ------ | -------------------------------------------- | ---- | ----------------- |
| POST   | `/api/v1/chat/:publicKey/session`            | No   | Start/resume chat |
| POST   | `/api/v1/chat/:publicKey/message`            | No   | Send message      |
| GET    | `/api/v1/chat/:publicKey/history/:sessionId` | No   | Get history       |
| POST   | `/api/v1/chat/:publicKey/handoff`            | No   | Request handoff   |
| POST   | `/api/v1/chat/:publicKey/lead`               | No   | Capture lead      |

**Send Message:**

```json
{
  "sessionId": "<from_session_response>",
  "message": "What products do you sell?"
}
```

**Capture Lead:**

```json
{
  "sessionId": "<id>",
  "name": "Jane",
  "email": "jane@co.com",
  "company": "JaneCo"
}
```

---

### Analytics

| Method | Endpoint                                   | Auth | Description   |
| ------ | ------------------------------------------ | ---- | ------------- |
| GET    | `/api/v1/analytics/bots/:id/overview`      | Yes  | Bot metrics   |
| GET    | `/api/v1/analytics/bots/:id/conversations` | Yes  | Conversations |
| GET    | `/api/v1/analytics/bots/:id/leads`         | Yes  | Leads         |

---

### Billing

| Method | Endpoint                       | Auth | Description     |
| ------ | ------------------------------ | ---- | --------------- |
| GET    | `/api/v1/billing/plans`        | No   | Available plans |
| GET    | `/api/v1/billing/subscription` | Yes  | My subscription |
| POST   | `/api/v1/billing/webhook`      | No   | Payment webhook |

---

### Themes

| Method | Endpoint                   | Auth | Description   |
| ------ | -------------------------- | ---- | ------------- |
| GET    | `/api/v1/themes`           | No   | All themes    |
| GET    | `/api/v1/themes/:themeKey` | No   | Theme details |

---

### Features

| Method | Endpoint                                  | Auth | Description       |
| ------ | ----------------------------------------- | ---- | ----------------- |
| GET    | `/api/v1/features?businessType=ecommerce` | Yes  | Features for type |

---

### Platform Admin

| Method | Endpoint                 | Auth  | Description    |
| ------ | ------------------------ | ----- | -------------- |
| GET    | `/api/v1/admin/overview` | Admin | Platform stats |

---

## Architecture

```
src/
├── config/          # DB, Redis, secrets
├── common/
│   ├── constants/   # Business types, features, themes, plans, tones
│   ├── errors/      # AppError class
│   ├── middleware/   # Auth, error handler, rate limiter, ownership, validate
│   └── utils/       # Pagination, JWT tokens, embed snippet
├── models/          # 15 Sequelize models
├── migrations/      # 15 migration files
├── seeders/         # Demo data
├── modules/
│   ├── auth/        # Register, login, refresh, logout
│   ├── users/       # Profile management
│   ├── businesses/  # Business/workspace CRUD
│   ├── form-schema/ # Adaptive wizard schemas
│   ├── bots/        # Multi-step config, prompt builder, publish
│   ├── features/    # Feature matrix by business type
│   ├── themes/      # Theme config
│   ├── embed/       # Token generation, snippet, widget config
│   ├── chat/        # Sessions, messages, LLM, lead, handoff
│   ├── analytics/   # Metrics and reporting
│   ├── billing/     # Plans, subscriptions, webhooks
│   ├── knowledge-base/  # Placeholder for RAG
│   └── platform-admin/  # Admin overview
├── jobs/            # Background tasks
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## LLM Configuration

Set `LLM_PROVIDER` in `.env`:

- `mock` (default) — returns simulated responses, no API key needed
- `openai` — set `OPENAI_API_KEY`
- `anthropic` — set `ANTHROPIC_API_KEY`

## NPM Scripts

| Script                 | Command                            |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start with nodemon                 |
| `npm start`            | Production start                   |
| `npm run migrate`      | Run all migrations                 |
| `npm run migrate:undo` | Undo all migrations                |
| `npm run seed`         | Seed demo data                     |
| `npm run seed:undo`    | Remove seeded data                 |
| `npm run reset-db`     | Full reset (undo + migrate + seed) |
