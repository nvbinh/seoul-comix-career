# **Seoul Comix Career**  
A full-stack **Next.js** application built with **tRPC, Prisma ORM, and PostgreSQL**.

## 🚀 **Project Overview**
This project showcases a restaurant listing app with a **PostgreSQL** backend, **tRPC API**, and a **Next.js** frontend.

## 🛠 **Backend Setup**
1. **Install PostgreSQL on macOS** (via Homebrew):  
   ```sh
   brew install postgresql
   brew services start postgresql
   ```
2. Ensure **PostgreSQL 14** or later is running.
3. Configure your **local database connection** in `.env`:
   ```ini
   DATABASE_URL="postgresql://seoul:1234@localhost:5432/mydb?schema=public"
   ```
4. **Run database migrations** to set up the schema:  
   ```sh
   npx prisma migrate dev --name init
   ```
   or, if needed, reset the database:
   ```sh
   npx prisma migrate reset
   ```
5. **Seed the database** with mock restaurant data:
   ```sh
   npx prisma db seed
   ```

## 💻 **Frontend Setup**
1. Install dependencies:
   ```sh
   yarn install
   ```
2. Start the **Next.js development server** (backend & frontend):
   ```sh
   yarn dev
   ```
3. Open [**localhost:3000**](http://localhost:3000) in your browser.


## 🌍 **Live Demo & Video**
### **Vercel Deployment**
🔗 [Live Demo (Vercel)](https://seoul-comix-career.vercel.app)  
⚠ **Note:** Vercel does not support direct PostgreSQL connections, so the backend is unavailable in this demo.

### **Localhost Video Demo**
📹 *(Check the attached video in the email)*  


## 🚧 **Remaining Issues**
### **1️⃣ Edge Functions & tRPC Backend**
- **Requirement:** The backend should be built using **tRPC** with **Edge Functions** (`runtime = 'edge'`).
- **Problem:** Edge Functions require **Prisma Data Proxy** (`prisma://` connection), but this requires hosting PostgreSQL **remotely**.
- **Solution:** To fully support Edge Functions, you need a **remote database** (e.g., Supabase, Neon, Railway, or Prisma Data Proxy).

### **2️⃣ Database Field Mismatch**
- Some **database fields** may not match the **Figma UI design**.  
- Please provide feedback on necessary updates, and I will adjust the schema accordingly.


## 📂 **Project Structure**
```plaintext
seoul-comix/
│── prisma/                   # Prisma configuration
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Prisma schema file
│── src/                      # Main source code
│   ├── components/           # Reusable React components
│   ├── app/                  # Next.js app
│   │   ├── api/              # API routes (tRPC)
│   │   ├── page.tsx          # Home page (restaurant list)
│   ├── server/               # Backend logic
│   │   ├── trpc/             # tRPC API handlers
│   │   │   ├── context.ts    # tRPC context (auth, etc.)
│   │   │   ├── router.ts     # Main tRPC router
│   │   │   ├── restaurant.ts # Restaurant API handlers
│   ├── styles/               # Global styles (Tailwind, CSS)
│   ├── utils/                # Utility functions/helpers
│── public/                   # Static assets (images, icons, etc.)
│── .env                      # Environment variables (DB connection)
│── package.json              # Dependencies and scripts
│── next.config.js            # Next.js configuration
│── tsconfig.json             # TypeScript configuration
```
