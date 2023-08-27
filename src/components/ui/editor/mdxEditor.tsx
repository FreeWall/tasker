import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import cn from 'classnames';
import { useRef } from 'react';

export default function MdxEditor({ className }: { className?: string }) {
  const ref = useRef<MDXEditorMethods>(null);

  return (
    <MDXEditor
      markdown="fdg"
      onChange={console.log}
      className={cn('dark-theme', className)}
      contentEditableClassName="bg-darker rounded-b font-sans !p-4 !text-body"
      ref={ref}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
    />
  );
}
