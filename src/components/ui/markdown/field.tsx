import type { Editor } from '@toast-ui/editor';
import cn from 'classnames';
import { forwardRef } from 'react';
import MarkdownEditor from './editor';
import MarkdownViewer from './viewer';

interface MarkdownFieldProps {
  markdown?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const MarkdownField = forwardRef<Editor, MarkdownFieldProps>(
  (props, editorFwdRef) => {
    const viewer = (
      <MarkdownViewer
        value={props.markdown}
        className={cn(
          'mb-10 flex w-full cursor-text rounded border border-dashed border-transparent bg-darker p-4 px-6',
          props.className,
        )}
      />
    );

    return (
      <div>
        <MarkdownEditor
          ref={editorFwdRef}
          className={cn('mb-10 w-full', props.className)}
          label="Description"
          defaultValue={props.markdown}
          loader={viewer}
          onChange={props.onChange}
        />
      </div>
    );
  },
);

MarkdownField.displayName = 'MarkdownField';

export default MarkdownField;
