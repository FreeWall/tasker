import { signOut, useSession } from 'next-auth/react';
import getConfig from 'next/config';
import { FaGithub, FaSignOutAlt } from 'react-icons/fa';

const { publicRuntimeConfig } = getConfig();

interface LayoutProps extends React.PropsWithChildren {}

export default function Layout(props: LayoutProps) {
  const { data } = useSession();

  return (
    <div className="flex min-h-screen flex-col">
      {data?.user && (
        <div className="absolute right-0 top-0 z-10 flex items-center p-3 sm:p-7">
          <div className="font-bold">{data.user.username}</div>
          <div className="ml-4">
            <FaSignOutAlt
              className="box-content h-6 w-6 cursor-pointer p-4 hover:text-white"
              title="Sign out"
              onClick={() => signOut()}
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-0 right-0">
        <a
          href={publicRuntimeConfig?.repository}
          target="_blank"
          className="inline-block p-6 text-body hover:text-white sm:p-10"
        >
          <FaGithub className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
      </div>
      <div className="p-6 sm:p-10">{props.children}</div>
    </div>
  );
}
