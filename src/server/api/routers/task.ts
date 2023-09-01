import prisma from '@/prisma/prisma';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export default router({
  list: procedure.query(async ({ ctx: { session } }) => {
    const tasks = await prisma.task.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        id: 'asc',
      },
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
        await prisma.task.update({
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
        return;
      }

      await prisma.task.create({
        data: {
          title: input.title ?? '',
          content: input.content ?? '',
          userId: session?.user.id as string,
        },
      });
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
