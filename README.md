
# Sustainability Idea Hub 🌱

A platform where users can submit, explore, and vote on innovative sustainability ideas. Built with modern technologies and clean architecture to promote eco-conscious collaboration.

---

## 🔗 Live URLs

- **Frontend:** [https://sustain-hub-frontend.vercel.app](https://sustain-hub-frontend.vercel.app)
- **Backend:** [https://sustain-hub-backend.vercel.app](https://sustain-hub-backend.vercel.app)
- **Admin Login Credentials:**
  - Email: `admin@example.com`
  - Password: `Password123` 

---

## 🧰 Tech Stack

### Frontend
- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Zod](https://zod.dev/) – for form validation
- [Lucide Icons](https://lucide.dev/)

### Backend
- Node.js + Express.js
- PostgreSQL (hosted on Render)
- Prisma ORM
- JWT Authentication
- SSLCommerz/ShurjoPay Payment Integration

---

## 🧩 Features

### 🧑 User Features
- Register/Login with JWT
- View all ideas (public and free)
- View only titles of paid ideas (must unlock)
- Vote on ideas (upvote/downvote)
- Comment on ideas
- Filter by category
- Unlock premium ideas via payment

### 🛠️ Admin Features
- Dashboard for user management
- Approve/Reject ideas
- Manage categories
- View all submitted ideas
- Role-based access control

---

## 📁 Folder Structure

```
src/
│
├── app/
│   ├── (WithCommonLayout)/          # Public pages layout (Home, Ideas, etc.)
│   ├── (WithDashboardLayout)/       # Dashboard layout (Admin/Member dashboard)
│   ├── dashboard/
│   │   ├── ideas/                   # Idea CRUD routes for members
│   │   └── ...                      # Additional dashboard features
│   ├── components/                  # UI components
│   ├── lib/                         # Utility functions
│   ├── services/                    # API interaction (frontend services)
│   ├── types/                       # Type definitions
│   └── hooks/                       # Custom hooks
```

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/shopna-akter/sustainHub-frontend.git
cd sustainability-idea-hub-frontend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.vercel.app/api
```

### 4. Run the Development Server

```bash
pnpm dev
```

App should be running on `http://localhost:3000`.

---

## 🚀 Deployment Guide

We used **Vercel** for frontend deployment:

```bash
pnpm build
vercel
```

- Provide environment variable: `NEXT_PUBLIC_API_BASE_URL`
- Choose default options unless customization needed
---