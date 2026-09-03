# SavoryBite — Premium African Dining

SavoryBite is a modern, full-stack African food-ordering platform. Customers can browse an appetizing menu of premium dishes — jollof, egusi, suya, grilled tilapia and more — add them to a live cart, and place orders, while staff manage menu items, orders, and analytics through a dedicated admin dashboard.

The storefront is built for conversion: a photo-led hero, social proof (ratings and reviews), sticky ordering, and a clean, mobile-first layout wrapped in the warm **Sahel Sunrise** design system.

---

## ✨ Features

### Customer Storefront (React SPA)
- **Premium menu** of authentic African dishes with real food photography, categories, prices, ratings, and customizable add-ons.
- **Quick ordering** — add to cart instantly from the grid; sticky order bar keeps the cart total and an "Order Now" action one tap away while scrolling.
- **Full cart & checkout** — add-ons, quantities, live totals, and a streamlined checkout flow.
- **Animated experience** — an animated splash screen on load, page transitions, and scroll-triggered reveals via Framer Motion.
- **Search & filters** — live search plus sticky category filter tabs on the menu page.
- **Auth** — register, log in, and access your profile (JWT-based).
- **Extras** — WhatsApp quick-contact button, promotions with coupon codes, testimonials, and a "How It Works" guide.

### Admin Dashboard (static)
- `dashboard` — operational overview.
- `orders` — view and manage incoming orders.
- `products` — manage menu items.
- `analytics` — sales and usage insights.
- `settings` — platform configuration.

### Backend API (Express + PostgreSQL)
- **Auth** — register, login, and profile with JWT authentication and role-based access (admin/customer).
- **Foods** — list, create, update, and delete menu items (writes restricted to admins).
- **Orders** — create orders, list them, and update status.
- **Surveys** — create surveys, list them, and submit responses.

---

## 🛠️ Tech Stack

| Layer       | Technology                                                            |
| ----------- | --------------------------------------------------------------------- |
| Frontend    | React 18, Vite, React Router, Framer Motion, React Icons, React Hot Toast |
| Backend     | Node.js, Express, JSON Web Tokens, bcryptjs                        |
| Database    | PostgreSQL (node-postgres)                                          |
| Admin       | Static HTML/CSS/JS pages                                            |
| Tooling     | ESLint, Nodemon, GitHub Actions (CI)                                |

### Design System — "Sahel Sunrise"
- **Palette:** cream `#fff9f0` base, terracotta primary `#e8693a`, indigo text `#1a2544`, with gold `#c8950e` and emerald `#2d8f5e` accents.
- **Typefaces:** Playfair Display (headings), Inter (body), DM Sans (labels/accents).
- **Styling:** a single global CSS file with design tokens (CSS custom properties) and Framer Motion for animation.

---

## 📁 Project Structure

```
savoryBite/
├── frontend/            # React single-page application (Vite)
│   └── src/
│       ├── assets/styles/global.css   # Sahel Sunrise design system
│       ├── components/                # Navbar, Footer, Hero, FoodCard,
│       │                              #   SplashScreen, StickyOrderBar, Cart, etc.
│       ├── sections/                  # Homepage sections (Categories, FeaturedFoods,
│       │                              #   HowItWorks, Promotions, Testimonials, ...)
│       ├── pages/                     # Home, Menu, About, Contact, Auth, Checkout
│       ├── context/                   # Cart & User context providers
│       ├── hooks/                     # useCart, useFetch, ...
│       ├── data/                      # foods & categories seed data
│       └── utils/                     # formatPrice, etc.
├── backend/             # Express REST API
│   └── src/
│       ├── app.js                  # Server entry point
│       ├── routes/                 # auth, foods, orders, surveys
│       ├── controllers/            # request handlers
│       ├── middleware/auth.js      # JWT + role guards
│       └── config/                 # db.js (pg pool), env.js
├── admin/               # Static admin dashboard pages
│   ├── dashboard/
│   ├── orders/
│   ├── products/
│   ├── analytics/
│   └── settings/
├── database/            # schema.sql + seed script
├── docs/                # Project documentation
├── .github/workflows/   # CI pipeline (lint + build + syntax checks)
└── .env.example         # Environment template
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18 (Node 20 recommended)
- **npm**
- **PostgreSQL** running locally (used by the backend)

### 1. Configure environment variables

Copy the template and fill in your values:

```bash
cp .env.example .env
```

```env
# ---- Backend ----
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/savorybite
JWT_SECRET=change-me-to-a-long-random-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Load the database schema & seed data

From the `database/` directory, create the tables:

```bash
psql "$DATABASE_URL" -f schema.sql
```

Then seed the menu from the backend (reads `.env` one level up):

```bash
cd backend
npm run seed
```

### 4. Run the development servers

```bash
# Terminal 1 — backend API (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## ⚙️ Available Scripts

### Frontend (`frontend/`)
| Command            | Description                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Start the Vite dev server         |
| `npm run build`    | Build a production bundle to `dist/` |
| `npm run preview`  | Preview the production build      |
| `npm run lint`     | Run ESLint over `src/`            |

### Backend (`backend/`)
| Command            | Description                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Start the API with Nodemon        |
| `npm start`        | Start the API in production mode  |
| `npm run seed`     | Seed the foods table              |

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Health
| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/health`     | Service health check |

### Auth — `/auth`
| Method | Endpoint        | Auth | Description                    |
| ------ | --------------- | ---- | ------------------------------ |
| POST   | `/register`     | No   | Register a new user            |
| POST   | `/login`        | No   | Log in and receive a JWT       |
| GET    | `/profile`      | Yes  | Get the authenticated profile  |

### Foods — `/foods`
| Method | Endpoint    | Auth                  | Description            |
| ------ | ----------- | --------------------- | ---------------------- |
| GET    | `/`         | No                    | List all foods         |
| GET    | `/:id`      | No                    | Get a single food      |
| POST   | `/`         | Admin                 | Create a food          |
| PUT    | `/:id`      | Admin                 | Update a food          |
| DELETE | `/:id`      | Admin                 | Delete a food          |

### Orders — `/orders`
| Method | Endpoint         | Auth | Description                        |
| ------ | ---------------- | ---- | ---------------------------------- |
| POST   | `/`              | Yes  | Create an order                    |
| GET    | `/`              | Yes  | List orders                        |
| GET    | `/mine`          | Yes  | Get the current user's orders      |
| GET    | `/:id`           | Yes  | Get a single order                 |
| PATCH  | `/:id/status`    | Yes  | Update an order's status           |

### Surveys — `/surveys`
| Method | Endpoint        | Auth | Description                 |
| ------ | --------------- | ---- | --------------------------- |
| POST   | `/`             | Yes  | Create a survey             |
| GET    | `/`             | No   | List surveys                |
| GET    | `/:id`          | No   | Get a single survey         |
| POST   | `/responses`    | Yes  | Submit a response to survey |

---

## 🗄️ Database Schema

Tables: `users`, `foods`, `orders`, `surveys`, `survey_responses`. Key indexes exist on `foods(category)`, `orders(status)`, and `orders(user_id)`. See [`database/schema.sql`](database/schema.sql).

---

## ✅ Continuous Integration (CI)

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request to `main`/`develop`:

- **Frontend:** `npm ci` → `npm run lint` → `npm run build`
- **Backend:** `npm ci` → Node syntax checks on core files

---

## 🛟 Troubleshooting

- **Backend cannot connect to PostgreSQL** — confirm PostgreSQL is running and `DATABASE_URL` in `.env` is correct.
- **API returns 404 on `/`** — this is normal; the API only exposes `/api/...` routes. Use the `/api/health` endpoint to confirm the server is up.
- **Ports already in use** — change `PORT` (backend) or run Vite with a custom port.
- **Changes not appearing in the browser** — close and reopen the tab, or clear the browser cache; Vite hot-reloads on save.

---

## 🧑‍💻 Contributing

1. Create a feature branch from `main` (e.g. `feature/your-feature`).
2. Make your changes and **run `npm run lint` and `npm run build`** in `frontend/` before committing.
3. Commit with clear, conventional messages and push.
4. Open a pull request into `main`; CI must pass before merging.

---

## 📄 License

This project is licensed under the terms of the repository owner. See the repo for details.
