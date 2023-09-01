import task from './routers/task';
import user from './routers/user';
import { router } from './trpc';

export const trpcRouter = router({
  user,
  task,
});

export type TrpcRouter = typeof trpcRouter;
