import type Prisma from '@prisma/client';
import { HTMLAttributes, forwardRef } from 'react';
import MarkdownViewer from '../ui/markdown/viewer';

interface TaskProps extends HTMLAttributes<HTMLDivElement> {
  task: Prisma.Task;
}

const Task = forwardRef<HTMLDivElement, TaskProps>(
  ({ task, ...rest }, fwdRef) => {
    return (
      <div
        ref={fwdRef}
        className="mb-6 mr-6 min-w-[200px] max-w-xs cursor-pointer rounded bg-darker"
        {...rest}
      >
        {task.title && (
          <div className="border-b-4 border-b-main p-4 px-5 text-lg font-bold">
            <div className="line-clamp-2">{task.title}</div>
          </div>
        )}
        <div className="px-5 pb-5 pt-1">
          <MarkdownViewer
            value={task.content}
            className="max-h-[200px] overflow-hidden"
          />
        </div>
      </div>
    );
  },
);

Task.displayName = 'Task';

export default Task;
