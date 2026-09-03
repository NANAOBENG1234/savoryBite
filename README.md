# SavoryBite — Premium African Dining

SavoryBite is a full-stack African food-ordering platform. Customers browse a menu of premium dishes — jollof, egusi, suya, grilled tilapia and more — add them to a live cart, and place orders, while staff manage menu items and orders through a dedicated admin dashboard.

---

## Features

### Customer Storefront (React SPA)
- Premium menu of authentic African dishes with real food photography, categories, prices, ratings, and customizable add-ons.
- Quick ordering from the grid, plus a sticky order bar that keeps ordering one tap away while scrolling.
- Full cart and checkout flow with add-ons, quantities, and live totals.
- Animated splash screen, page transitions, and scroll-triggered reveals.
- Live search and category filter tabs on the menu page.
- User registration, login, and profiles.

### Admin Dashboard (static)
- Dashboard, orders, products, analytics, and settings pages.

### Backend API
- Authentication (JWT), foods, orders, and surveys endpoints.

---

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Framer Motion
- **Backend:** Node.js, Express, JWT, bcryptjs
- **Database:** PostgreSQL
- **Admin:** Static HTML/CSS/JS
- **Tooling:** ESLint, Nodemon, GitHub Actions (CI)

---

## Project Structure

```
savoryBite/
├── frontend/    React single-page application (Vite)
├── backend/     Express REST API
├── admin/       Static admin dashboard
├── database/    Schema and seed scripts
├── docs/        Project documentation
└── .github/     CI workflow
```

---

## Development

The project is composed of a React frontend, an Express API, and a static admin dashboard. Install and run each component locally by following the scripts defined in their respective `package.json` files.

> **Note:** Environment configuration is managed locally and is **not** included in this repository. The real environment file is never committed or shared.
