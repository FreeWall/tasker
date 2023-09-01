import Layout from '@/components/layout';
import '@/styles/globals.css';
import { trpc } from '@/utils/trpc';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppType } from 'next/app';
import Head from 'next/head';

const App: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <title>Tasker</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
