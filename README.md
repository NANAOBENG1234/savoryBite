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
