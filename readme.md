# Mini Social Feed App — Repository
## Overview
This repository contains two main parts:

- `backend/` — NestJS + Sequelize backend (APIs for auth, posts, likes, comments)
- `react_native_client/` — Expo React Native mobile app (feed, auth, create post, comment and like etch post)

## Deliverables (what to submit)
- GitHub repo with `backend/` and `react_native_client/` folders
- APK (or Expo build) for the mobile app (Google Drive share link)
- README with run instructions and API docs

## Quick status / what is in this repo
- Backend: authentication (JWT), Posts API, Like/Comment models, controllers and services
- Mobile: Expo app skeleton with feed + auth screens (see `react_native_client/`)

## Prerequisites (local)
- macOS (your machine)
- Node.js (16+ recommended)
- Docker & Docker Compose (for running DB + backend easily)
- Yarn or npm

## Environment variables (backend)
Create a `.env` in `backend/` (or supply env values via Docker compose). Required vars:

- `PG_HOST` — Postgres host (eg. `db` if using docker-compose)
- `PG_PORT` — Postgres port (eg. `5432`)
- `PG_USER` — Postgres user
- `PG_PASS` — Postgres password
- `PG_NAME` — Postgres database name
- `JWT_SECRET` — secret for JWT signing
- `COOKIE_KEY` — cookie name/key (if used)
- `NODE_ENV` — development/production
- `FCM_SERVER_KEY` — Firebase server key (for sending notifications from backend)

## How to run the backend (recommended: Docker Compose)
This repo includes a `compose.yml` at the project root. To run the backend and DB quickly:

```bash
# from project root
docker compose up --build
```

If you prefer running locally without Docker, run:

```bash
cd backend
yarn install    # or npm install
yarn start:dev  # or npm run start:dev
```

## API reference (summary)
Base path: `http://localhost:8000` (default when running backend via Docker compose)

### Auth
- `POST /auth/signup` — body: { name, email, password }
- `POST /auth/login` — body: { email, password }

### Posts
- `POST /posts` — Create text-only post. Body: { content, userId }
- `GET /posts` — Get all posts (query params: userId, limit, offset)
- `GET /posts/:id` — Get post with relations (user, likes, comments, shares)
- `PUT /posts/:id/like` — Create like base on post
- `PUT /posts/:id/comment` — Create comment base on post

## React Native client (Expo)
Location: `react_native_client/`

Run the app locally with Expo:

```bash
cd react_native_client
yarn install
expo start
```

## Testing & validation
- Use Postman / Insomnia to call APIs. Use login endpoint to get JWT and add `Authorization: Bearer <token>` to protected endpoints.
- Verify notifications by triggering a like/comment and checking FCM console or a real device.


## Contact / support
If you have questions about the test, contact: devrejaul.official@gmail.com

---
Last updated: 2025-11-02
