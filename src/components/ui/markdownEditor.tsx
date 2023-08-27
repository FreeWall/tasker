import type Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

function Loader() {
  return (
    <div className="relative h-[210px] overflow-hidden rounded bg-darker !p-4"></div>
  );
}

/* const TuiEditor = dynamic(
  async () => (await import('@toast-ui/editor')).Editor,
  {
    ssr: false,
  },
); */

export default function MarkdownEditor(props: {
  defaultValue?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef(null);
  const editor = useRef<Editor>();

  useEffect(() => {
    (async () => {
      const Editor = (await import('@toast-ui/editor')).Editor;
      editor.current = new Editor({
        el: rootRef.current!,
        initialEditType: 'wysiwyg',
        hideModeSwitch: true,
        theme: 'dark',
        minHeight: '150px',
        height: 'auto',
        placeholder: props.label,
        toolbarItems: [
          ['bold', 'italic', 'strike'],
          ['heading', 'hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['code', 'codeblock'],
        ],
        events: {
          load: () => {
            setLoaded(true);
          },
          change: () => {
            console.log(editor.current?.getMarkdown());
          },
        },
      });
    })();
  }, []);

  return (
    <div className={cn('relative', props.className)}>
      {/* {props.label && (
        <label className="pointer-events-none absolute -top-1.5 left-0 z-10 flex h-full w-full select-none pl-3.5 text-[13px] font-normal leading-[0.75] text-placeholder ">
          {props.label}
        </label>
      )} */}

      {!loaded && <Loader />}
      <div ref={rootRef}></div>
    </div>
  );
}
