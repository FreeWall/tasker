import Task from '@/components/task';
import TaskForm from '@/components/task/form';
import Input from '@/components/ui/input';
import { trpc } from '@/utils/trpc';
import type Prisma from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { authOptions } from './api/auth/[...nextauth]';

export default function Index() {
  const taskList = trpc.task.list.useQuery();
  const [formVisible, setFormVisible] = useState(false);
  const [formTask, setFormTask] = useState<Prisma.Task>();

  return (
    <div className="relative">
      <h1 className="mb-10 text-2xl font-bold sm:text-3xl">Tasker</h1>
      {!formVisible && (
        <div className="absolute left-1/2 top-0 w-1/3 -translate-x-1/2">
          <Input
            className="w-full"
            label="Write a task..."
            readOnly
            onFocus={(e) => {
              e.target.blur();
              setFormTask(undefined);
              setFormVisible(true);
            }}
          />
        </div>
      )}

      {taskList.status == 'loading' && (
        <div className="flex justify-center py-32 text-2xl text-placeholder">
          <CgSpinner
            className="animate-spin text-placeholder"
            size={48}
          />
        </div>
      )}

      {taskList.status == 'success' && taskList.data?.tasks.length == 0 && (
        <div className="py-32 text-center text-2xl text-placeholder">
          No tasks yet
        </div>
      )}

      {taskList.data?.tasks && (
        <div className="flex flex-wrap">
          {taskList.data?.tasks.map((task, idx) => (
            <Task
              key={idx}
              task={task}
              onClick={() => {
                setFormTask(task);
                setFormVisible(true);
              }}
            />
          ))}
        </div>
      )}

      {formVisible && (
        <TaskForm
          task={formTask}
          onClickOutside={() => setFormVisible(false)}
          onDone={() => {
            setFormVisible(false);
            taskList.refetch();
          }}
        />
      )}
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
}
