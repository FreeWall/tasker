import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log('dfgfdg');
      console.log(token);
      if (req.nextUrl.pathname.startsWith('/auth/')) {
        return true;
      }

      if (req.nextUrl.pathname.startsWith('/api/trpc/')) {
        return true;
      }

      return !!token;
    },
  },
});
