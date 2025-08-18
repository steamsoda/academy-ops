import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./../lib/db";
import { compare } from "bcryptjs";

export const authOptions = {
  session: { strategy: 'jwt' as const },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email } });
        if (!user || !user.password) return null;
        const ok = await compare(creds.password, user.password);
        if (!ok) return null;
        return { id: user.id, name: user.name ?? "", email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) { if (user) token.role = (user as any).role; return token; },
    async session({ session, token }: any) { (session as any).user.role = token.role; return session; }
  },
  pages: { signIn: '/auth/login' }
};
