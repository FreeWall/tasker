import prisma from '@/prisma/prisma';
import { hashSync } from 'bcrypt';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export default router({
  create: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          username: input.username,
          password: hashSync(input.password, 12),
        },
      });

      return {
        user,
      };
    }),
});
