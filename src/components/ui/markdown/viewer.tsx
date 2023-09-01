import type { Viewer } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import cn from 'classnames';
import { HTMLAttributes, forwardRef, useEffect, useRef } from 'react';

interface MarkdownViewerProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  className?: string;
}

const MarkdownViewer = forwardRef<HTMLDivElement, MarkdownViewerProps>(
  (props, fwdRef) => {
    const rootRef = useRef(null);
    const viewerRef = useRef<Viewer>();

    useEffect(() => {
      (async () => {
        const Viewer = (
          await import('@toast-ui/editor/dist/toastui-editor-viewer')
        ).default;

        viewerRef.current = new Viewer({
          el: rootRef.current!,
          theme: 'dark',
          initialValue: props.value,
          events: {
            load: () => {},
          },
        });
      })();

      return () => {
        viewerRef.current?.destroy();
      };
    }, [props]);

    return (
      <div
        className={cn(props.className)}
        ref={fwdRef}
        {...props}
      >
        <div
          ref={rootRef}
          className="w-full"
        ></div>
      </div>
    );
  },
);

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer;
