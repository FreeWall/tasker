import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { trpc } from '@/utils/trpc';
import isEmpty from 'lodash/isEmpty';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function SignUp() {
  const { status } = useSession();
  const router = useRouter();

  const { mutateAsync: createUser } = trpc.user.create.useMutation();

  const [formStatus, setFormStatus] = useState<
    'loading' | 'error' | 'success' | undefined
  >();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (status == 'authenticated') {
    router.push('/');
  }

  async function register() {
    if (!usernameRef.current?.value || isEmpty(usernameRef.current?.value)) {
      return;
    }

    if (!passwordRef.current?.value || isEmpty(passwordRef.current?.value)) {
      return;
    }

    setFormStatus('loading');

    try {
      await createUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

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
    } catch (e) {
      setFormStatus('error');
      return;
    }
  }

  return (
    <div className="flex">
      <div className="mx-auto max-w-sm pt-32">
        <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
          Create an account
        </h1>

        <Input
          ref={usernameRef}
          label="Username"
          className="mb-5 w-[300px]"
          onKeyDown={(e) => e.key == 'Enter' && register()}
        />
        <Input
          ref={passwordRef}
          label="Password"
          type="password"
          className="mb-10 w-[300px]"
          onKeyDown={(e) => e.key == 'Enter' && register()}
        />

        <div className="flex items-center justify-between">
          <Button
            loading={formStatus == 'loading' || formStatus == 'success'}
            onClick={() => register()}
          >
            Sign up
          </Button>
          <Link href="/auth/signin">
            <a className="text-right text-sm">
              Have an account?
              <br />
              <b>Login</b>
            </a>
          </Link>
        </div>

        {formStatus == 'error' && (
          <div className="mt-10 text-red-500">
            Something went wrong, try again.
          </div>
        )}
      </div>
    </div>
  );
}
