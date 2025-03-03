This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## The github
All the latest code in the branch `main`

## The backend setup
1. Need a postgresql on your localhost.
`brew install postgresql`
`brew services start postgresql`
2. Here using postgresql@14, then start postgresql server
3. The config DATABASE localhost in `.env`
`DATABASE_URL="postgresql://seoul:1234@localhost:5432/mydb?schema=public"`
4. Migrate Prisma ORM with postgresql
`npx prisma migrate dev --name` or `npx prisma migrate reset`
5. Making mockup restaurant data
`npx prisma db seed`

## The frontend setup
1. Install npm packages with `yarn install`
2. Start the server both backend trpc and frontend `yarn dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Vercel Demo and Video Demo on my localhost
1. Vercel demo
[link](https://seoul-comix-career.vercel.app)
This is not support postgresql cause of not support postgresql on Vercel

2. Localhost demo video
[link](as the video attached in the email)

## The 2 issues remaining
1. In the first requirement:
`TRPC: The backend should be built using TRPC. If you are using nextjs, use edge functions to serve trpc endpoint.` 
src/app/api/trpc/[trpc]/route.ts
export const runtime = 'edge';
As my understand, it means we need to support runtime = 'edge' we need to config a DATABASE_URL with prefix prisma proxy with engineType = "dataproxy" in prisma schem
But I do not have a server for deploy my postgresql database to work as a proxy server

2. I assume with few mismatch between database field and Figma UI data. In case you want me to update correctly please feedback to me, I will update it soon


## Basic Project Structure
<pre>
seoul-comix/
│── prisma/                   # Prisma configuration
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Prisma schema file
│── src/                      # Main source code
│   ├── components/           # Reusable React components
│   ├── app/                  # Next.js app
│   │   ├── api/              # API routes (for tRPC)
│   │   ├── page.tsx          # Home page (restaurant list)
│   ├── server/               # Backend logic
│   │   ├── trpc/             # tRPC API handlers
│   │   │   ├── context.ts    # tRPC context (authentication, etc.)
│   │   │   ├── router.ts     # Main tRPC router
│   │   │   ├── restaurant.ts # Restaurant API handlers
│   ├── styles/               # Global styles (CSS, Tailwind, etc.)
│   ├── utils/                # Utility functions/helpers
│── public/                   # Static assets (images, icons, etc.)
│── .env                      # Environment variables (DB connection)
│── package.json              # Dependencies and scripts
│── next.config.js            # Next.js configuration
│── tsconfig.json             # TypeScript configuration
</pre>
