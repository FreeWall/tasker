import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import MarkdownEditor from '@/components/ui/markdown/editor';
import MarkdownViewer from '@/components/ui/markdown/viewer';
import type Editor from '@toast-ui/editor';
import getConfig from 'next/config';
import { useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const { publicRuntimeConfig } = getConfig();

export default function Index() {
  const editorRef = useRef<Editor>(null);
  const [markdown, setMarkdown] = useState('bagr s lopatou');
  const [edit, setEdit] = useState(false);

  const viewer = (
    <MarkdownViewer
      value={markdown}
      className="mb-10 flex w-[680px] cursor-pointer rounded border border-dashed border-transparent bg-darker p-4 px-6 "
      onClick={() => setEdit(true)}
    />
  );

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

        {edit && (
          <MarkdownEditor
            ref={editorRef}
            className="mb-10 w-[680px]"
            label="Write a note..."
            defaultValue={markdown}
            onChange={setMarkdown}
            loader={viewer}
          />
        )}

        {!edit && viewer}

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
