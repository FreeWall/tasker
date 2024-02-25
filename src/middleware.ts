import { withAuth } from 'next-auth/middleware';

// ahoj

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith('/auth/')) {
        return false;
      }

      if (req.nextUrl.pathname.startsWith('/api/trpc/')) {
        return false;
      }

      return !!token;
    },
  },
});
