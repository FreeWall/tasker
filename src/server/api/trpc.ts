import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(opts.req, opts.res, authOptions);
  return {
    req: opts.req,
    res: opts.res,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({});

export const router = t.router;
export const publicProcedure = t.procedure;
export const procedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  }),
);
