import type { Editor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import cn from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';

function Loader() {
  return (
    <div className="relative h-[200px] overflow-hidden rounded bg-darker !p-4"></div>
  );
}

interface MarkdownEditorProps {
  defaultValue?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}

const MarkdownEditor = forwardRef<Editor, MarkdownEditorProps>(
  (props, editorFwdRef) => {
    const [loaded, setLoaded] = useState(false);
    const rootRef = useRef(null);
    const editorRef = useRef<Editor>();

    useEffect(() => {
      (async () => {
        const Editor = (await import('@toast-ui/editor')).Editor;

        editorRef.current = new Editor({
          el: rootRef.current!,
          initialEditType: 'wysiwyg',
          hideModeSwitch: true,
          theme: 'dark',
          minHeight: '150px',
          height: 'auto',
          initialValue: props.defaultValue,
          placeholder: props.label,
          toolbarItems: [
            ['heading'],
            ['bold', 'italic', 'strike'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['quote', 'hr'],
            ['code', 'codeblock'],
          ],
          events: {
            load: () => {
              setLoaded(true);
            },
            change: () => {
              editorRef.current &&
                props.onChange?.(editorRef.current.getMarkdown());
            },
          },
        });

        if (typeof editorFwdRef === 'function') {
          editorFwdRef(editorRef.current);
        } else if (editorFwdRef) {
          editorFwdRef.current = editorRef.current;
        }
      })();

      return () => {
        editorRef.current?.destroy();
      };
    }, [editorFwdRef, props.defaultValue, props.label, props.onChange]);

    return (
      <div className={cn('relative', props.className)}>
        {!loaded && <Loader />}
        <div
          className={cn({ 'pointer-events-none absolute opacity-0': !loaded })}
        >
          <div ref={rootRef}></div>
        </div>
      </div>
    );
  },
);

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
