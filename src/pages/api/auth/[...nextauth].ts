import prisma from '@/prisma/prisma';
import { compareSync } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      return {
        expires: session.expires,
        user: {
          username: user?.username as string,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !compareSync(credentials.password, user.password)) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
