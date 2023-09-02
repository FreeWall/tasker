import type Prisma from '@prisma/client';
import cn from 'classnames';
import { HTMLAttributes, forwardRef } from 'react';
import MarkdownViewer from '../ui/markdown/viewer';

interface TaskProps extends HTMLAttributes<HTMLDivElement> {
  task: Prisma.Task & {
    chosen?: boolean;
  };
}

const Task = forwardRef<HTMLDivElement, TaskProps>(
  ({ task, className, ...rest }, fwdRef) => {
    return (
      <div
        ref={fwdRef}
        {...rest}
        className={cn(
          'mb-6 mr-6 min-w-[200px] max-w-xs cursor-pointer rounded bg-darker',
          {
            'shadow-[0_0_0_1px_theme(colors.conversion)]': task.chosen,
          },
        )}
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
