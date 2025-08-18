import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        // Simple hardcoded auth for demo
        if (creds?.email === 'admin@dfmonterrey.mx' && creds?.password === 'admin123') {
          return { 
            id: '1', 
            name: 'Admin', 
            email: 'admin@dfmonterrey.mx', 
            role: 'DIRECTOR' 
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) { 
      if (user) token.role = (user as any).role; 
      return token; 
    },
    async session({ session, token }: any) { 
      (session as any).user.role = token.role; 
      return session; 
    }
  },
  pages: { signIn: '/auth/login' }
};
