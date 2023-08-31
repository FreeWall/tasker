import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
    >
      <input
        name="csrfToken"
        type="hidden"
        defaultValue={csrfToken}
      />
      <label>
        Username
        <input
          name="username"
          type="text"
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
        />
      </label>
      <button
        type="button"
        onClick={() =>
          signIn('credentials', { username: 'testt', password: 'bagr' })
        }
      >
        Sign in
      </button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
