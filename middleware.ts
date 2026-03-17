import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
});

export const config = {
  // Protect all routes except:
  // - api/auth (NextAuth API)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico
  // - login (auth pages)
  // - products (the public products page)
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|products).*)",
  ],
};
