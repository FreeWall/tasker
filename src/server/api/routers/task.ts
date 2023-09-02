import prisma from '@/prisma/prisma';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export default router({
  list: procedure.query(async ({ ctx: { session } }) => {
    const tasks = await prisma.task.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: [
        {
          order: 'asc',
        },
        {
          id: 'asc',
        },
      ],
    });

    return {
      tasks,
    };
  }),
  createOrUpdate: procedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string().optional(),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx: { session } }) => {
      if (input.id) {
        const task = await prisma.task.update({
          where: {
            id: input.id,
            userId: session?.user.id,
          },
          data: {
            title: input.title ?? '',
            content: input.content ?? '',
            userId: session?.user.id as string,
          },
        });
        return task;
      }

      const taskCount = await prisma.task.aggregate({
        where: {
          userId: session?.user.id,
        },
        _max: {
          order: true,
        },
      });

      return await prisma.task.create({
        data: {
          title: input.title ?? '',
          content: input.content ?? '',
          order: (taskCount._max.order ?? 0) + 1,
          userId: session?.user.id as string,
        },
      });
    }),
  updateOrder: procedure
    .input(
      z.array(
        z.object({
          id: z.number(),
          order: z.number(),
        }),
      ),
    )
    .mutation(async ({ input, ctx: { session } }) => {
      for (const task of input) {
        await prisma.task.update({
          where: {
            id: task.id,
            userId: session?.user.id,
          },
          data: {
            order: task.order,
          },
        });
      }
    }),
  remove: procedure
    .input(
      z.object({
        id: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx: { session } }) => {
      await prisma.task.delete({
        where: {
          id: input.id,
          userId: session?.user.id,
        },
      });
    }),
});
