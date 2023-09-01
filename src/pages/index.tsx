import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import MarkdownField from '@/components/ui/markdown/field';
import type { Editor } from '@toast-ui/editor';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useRef } from 'react';
import { authOptions } from './api/auth/[...nextauth]';

export default function Index() {
  const markdownRef = useRef<Editor>(null);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">Tasker</h1>
      <Input
        label="Title"
        className="mb-6 w-[300px]"
      />
      <MarkdownField ref={markdownRef} />

      <Button
        onClick={() => {
          console.log(markdownRef.current?.getMarkdown());
        }}
      >
        Save
      </Button>
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
}
