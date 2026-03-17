# Frontend Task

This is a responsive web application that displays and manages a list of products, built with [Next.js](https://nextjs.org), React, and Tailwind CSS.

## Features

- **Authentication**: Fully integrated with NextAuth.js (`next-auth`) using Credentials Provider and `dummyjson.com/auth` for login.
- **Protected Routes**: Middleware protects the application by default, only letting authenticated users proceed.
- **Public Routes**: The `/products` route (and any children) is completely public and explicitly allowed via the authentication middleware.
- **UI Components**: Now using `lucide-react` for customized iconography.

## Getting Started

First, ensure you have the required environment variables. Create a `.env.local` file in the root of the project with the following (these are the minimum requirements):

```bash
NEXTAUTH_SECRET=fallback_secret_for_development
NEXTAUTH_URL=http://localhost:3000
```

_Note: In production, generate a strong random string for `NEXTAUTH_SECRET`._

### Running the Development Server

```bash
npm install
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
