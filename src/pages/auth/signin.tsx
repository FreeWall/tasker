import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import isEmpty from 'lodash/isEmpty';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  const [formStatus, setFormStatus] = useState<
    'loading' | 'error' | 'success' | undefined
  >();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (status == 'authenticated') {
    router.push('/');
  }

  async function login() {
    if (!usernameRef.current?.value || isEmpty(usernameRef.current?.value)) {
      return;
    }

    if (!passwordRef.current?.value || isEmpty(passwordRef.current?.value)) {
      return;
    }

    setFormStatus('loading');

    const data = await signIn('credentials', {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      redirect: false,
    });

    if (!data?.ok) {
      setFormStatus('error');
      return;
    }

    setFormStatus('success');
  }

  return (
    <div className="flex">
      <div className="mx-auto max-w-sm pt-32">
        <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">Login</h1>

        <Input
          ref={usernameRef}
          label="Username"
          className="mb-5 w-[300px]"
          onKeyDown={(e) => e.key == 'Enter' && login()}
        />
        <Input
          ref={passwordRef}
          label="Password"
          type="password"
          className="mb-10 w-[300px]"
          onKeyDown={(e) => e.key == 'Enter' && login()}
        />

        <div className="flex items-center justify-between">
          <Button
            loading={formStatus == 'loading' || formStatus == 'success'}
            onClick={() => login()}
          >
            Login
          </Button>
          <Link
            href="/auth/signup"
            className="text-right text-sm"
          >
            <a className="text-right text-sm">
              Don{"'"}t have an account?
              <br />
              <b>Create one</b>
            </a>
          </Link>
        </div>

        {formStatus == 'error' && (
          <div className="mt-10 text-red-500">Bad credentials, try again.</div>
        )}
      </div>
    </div>
  );
}
