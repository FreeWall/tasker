import { trpc } from '@/utils/trpc';
import type Prisma from '@prisma/client';
import Editor from '@toast-ui/editor';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useRef, useState } from 'react';
import useKey from 'react-use/lib/useKey';
import Button from '../ui/button';
import Input from '../ui/input';
import MarkdownField from '../ui/markdown/field';

interface TaskFormProps {
  task?: Prisma.Task;
  onClickOutside?: () => void;
  onDone?: () => void;
}

export default function TaskForm(props: TaskFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<Editor>(null);

  const [valid, setValid] = useState(false);

  const utils = trpc.useContext();
  const createTask = trpc.task.createOrUpdate.useMutation();
  const removeTask = trpc.task.remove.useMutation();

  useEffect(() => {
    setValid(!!props.task);
  }, [props.task]);

  useKey(
    'Escape',
    () => {
      discard();
    },
    {},
    [discard],
  );

  async function submit() {
    const newTask = await createTask.mutateAsync({
      id: props.task?.id,
      title: titleRef.current?.value,
      content: markdownRef.current?.getMarkdown(),
    });

    if (!props.task?.id) {
      utils.task.list.setData(undefined, (old) => ({
        tasks: [...(old?.tasks ? old.tasks : []), newTask],
      }));
    } else {
      utils.task.list.setData(undefined, (old) => ({
        tasks: [...(old?.tasks ? old.tasks : [])].map((task) => {
          if (task.id == props.task?.id) {
            task.title = newTask.title;
            task.content = newTask.content;
          }
          return task;
        }),
      }));
    }

    props.onDone?.();
  }

  async function remove() {
    await removeTask.mutateAsync({
      id: props.task?.id,
    });

    utils.task.list.setData(undefined, (old) => ({
      tasks: [...(old?.tasks ? old.tasks : [])].filter((task) => {
        return task.id != props.task?.id;
      }),
    }));

    props.onDone?.();
  }

  function discard() {
    if (document.activeElement === titleRef.current) {
      return;
    }

    if (document.activeElement?.className.includes('toastui-editor-contents')) {
      return;
    }

    if (
      ((props.task &&
        (props.task.content != markdownRef.current?.getMarkdown() ||
          props.task.title != titleRef.current?.value)) ||
        (!props.task && valid)) &&
      !confirm('Discard changes?')
    ) {
      return;
    }

    if (createTask.isLoading) {
      return;
    }

    props.onClickOutside?.();
  }

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          discard();
        }
      }}
    >
      <div className="absolute mt-32 flex w-1/3 flex-col rounded-lg bg-main p-10">
        <Input
          ref={titleRef}
          maxLength={100}
          label="Title"
          className="mb-6 w-full"
          defaultValue={props.task?.title}
          onChange={useCallback(
            () =>
              setValid(
                !isEmpty(markdownRef.current?.getMarkdown()) ||
                  !isEmpty(titleRef.current?.value),
              ),
            [setValid],
          )}
        />

        <MarkdownField
          ref={markdownRef}
          className="max-h-[calc(85vh-300px)] overflow-y-auto"
          markdown={props.task?.content}
          onChange={useCallback(
            () =>
              setValid(
                !isEmpty(markdownRef.current?.getMarkdown()) ||
                  !isEmpty(titleRef.current?.value),
              ),
            [setValid],
          )}
        />

        <div className="flex justify-between">
          <Button
            onClick={submit}
            disabled={!valid}
            loading={createTask.isLoading}
          >
            {props.task ? 'Save' : 'Create'}
          </Button>

          {props.task && (
            <Button
              color="red"
              onClick={remove}
              loading={removeTask.isLoading}
            >
              Remove
            </Button>
          )}
        </div>

        {(createTask.error || removeTask.error) && (
          <div className="mt-8 text-red-500">
            {createTask.error?.message || removeTask.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}
