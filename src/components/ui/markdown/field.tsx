import type { Editor } from '@toast-ui/editor';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { forwardRef, useState } from 'react';
import MarkdownEditor from './editor';
import MarkdownViewer from './viewer';

interface MarkdownFieldProps {
  markdown?: string;
  className?: string;
}

const MarkdownField = forwardRef<Editor, MarkdownFieldProps>(
  (props, editorFwdRef) => {
    const [editable, setEditable] = useState(isEmpty(props.markdown));

    const viewer = (
      <MarkdownViewer
        value={props.markdown}
        className={cn(
          'mb-10 flex w-[680px] cursor-text rounded border border-dashed border-transparent bg-darker p-4 px-6',
          props.className,
          { 'opacity-75': editable },
        )}
        onClick={() => setEditable(true)}
      />
    );

    return (
      <div>
        {editable && (
          <MarkdownEditor
            ref={editorFwdRef}
            className="mb-10 w-[680px]"
            label="Write a note..."
            defaultValue={props.markdown}
            loader={viewer}
          />
        )}

        {!editable && viewer}
      </div>
    );
  },
);

MarkdownField.displayName = 'MarkdownField';

export default MarkdownField;
