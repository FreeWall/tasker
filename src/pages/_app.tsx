import '@/styles/globals.css';
import { trpc } from '@/utils/trpc';
import { AppProps, AppType } from 'next/app';
import Head from 'next/head';

const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <title>Tasker</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(App);
