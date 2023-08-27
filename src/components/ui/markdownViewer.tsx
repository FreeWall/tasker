import type { Viewer } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import cn from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';

function Loader() {
  return (
    <div className="relative h-[200px] overflow-hidden rounded bg-darker !p-4"></div>
  );
}

interface MarkdownViewerProps {
  value?: string;
  className?: string;
}

const MarkdownViewer = forwardRef<Viewer, MarkdownViewerProps>(
  (props, editorFwdRef) => {
    const [loaded, setLoaded] = useState(false);
    const rootRef = useRef(null);
    const editorRef = useRef<Viewer>();

    useEffect(() => {
      (async () => {
        const Viewer = (
          await import('@toast-ui/editor/dist/toastui-editor-viewer')
        ).default;

        editorRef.current = new Viewer({
          el: rootRef.current!,
          theme: 'dark',
          initialValue: props.value,
          events: {
            load: () => {
              setLoaded(true);
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
    }, [editorFwdRef, props]);

    return (
      <div className={cn(props.className)}>
        <div
          className={cn('w-full', {
            'pointer-events-none absolute opacity-0': !loaded,
          })}
        >
          <div ref={rootRef}></div>
        </div>
      </div>
    );
  },
);

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer;
