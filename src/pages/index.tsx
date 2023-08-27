import Button from '@/components/ui/button';
import Editor from '@/components/ui/editor';
import Input from '@/components/ui/input';
import getConfig from 'next/config';
import { FaGithub } from 'react-icons/fa';

const { publicRuntimeConfig } = getConfig();

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute right-0 top-0">
        <a
          href={publicRuntimeConfig?.repository}
          target="_blank"
          className="inline-block p-6 text-body hover:text-white sm:p-10"
        >
          <FaGithub className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
      </div>
      <div className="p-6 sm:p-10">
        <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">Tasker</h1>
        <Input
          label="Username"
          className="mb-6 w-[300px]"
        />
        <Input
          label="Password"
          type="password"
          className="mb-10 w-[300px]"
        />
        <Editor className="mb-10" />
        <Button>Create</Button>
        <Button disabled>Create</Button>
        <Button loading>Create</Button>
      </div>
    </div>
  );
}