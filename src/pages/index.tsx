import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import MarkdownEditor from '@/components/ui/markdownEditor';
import MarkdownViewer from '@/components/ui/markdownViewer';
import type Editor from '@toast-ui/editor';
import getConfig from 'next/config';
import { useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const { publicRuntimeConfig } = getConfig();

export default function Index() {
  const editorRef = useRef<Editor>(null);
  const [markdown, setMarkdown] = useState('');

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
        <MarkdownEditor
          ref={editorRef}
          className="mb-10 w-[680px]"
          label="Write a note..."
          onChange={setMarkdown}
        />

        <MarkdownViewer
          value={markdown}
          className="mb-10 flex w-[680px] cursor-pointer rounded border border-transparent bg-darker p-4 px-6 hover:border-conversion"
        />

        <Button
          onClick={() => {
            console.log(editorRef.current?.getMarkdown());
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
