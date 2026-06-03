import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Role } from '@/types/auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
        role:     { label: 'Role',     type: 'text'     },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // TODO: replace with real API call to NestJS backend
        // POST http://localhost:3001/auth/login
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email:    credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();
          const payload = data?.data;

          if (!payload?.access_token) return null;

          return {
            id:           payload.user.id,
            name:         payload.user.username,
            email:        payload.user.email,
            role:         (credentials.role as Role) ?? 'RESIDENT',
            access_token: payload.access_token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id           = user.id;
        token.role         = (user as any).role;
        token.access_token = (user as any).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id           = token.id;
        (session.user as any).role         = token.role;
        (session.user as any).access_token = token.access_token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-secret-change-in-production',
});

export { handler as GET, handler as POST };
