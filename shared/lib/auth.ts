import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "emilys" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "emilyspass",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
              // We want to get the token back
              expiresInMins: 60,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const user = await res.json();
          if (user) {
            return {
              id: user.id.toString(),
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              image: user.image,
              accessToken: user.token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
};
