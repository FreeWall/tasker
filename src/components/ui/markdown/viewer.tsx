import type { Viewer } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import cn from 'classnames';
import { HTMLAttributes, forwardRef, useEffect, useRef } from 'react';

interface MarkdownViewerProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  className?: string;
}

const MarkdownViewer = forwardRef<HTMLDivElement, MarkdownViewerProps>(
  ({ value, className, ...rest }, fwdRef) => {
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
          initialValue: value,
          events: {
            load: () => {},
          },
        });
      })();

      return () => {
        viewerRef.current?.destroy();
      };
    }, [value]);

    return (
      <div
        className={cn(className)}
        ref={fwdRef}
        {...rest}
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
