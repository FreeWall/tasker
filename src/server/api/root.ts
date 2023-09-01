import user from './routers/user';
import { router } from './trpc';

export const trpcRouter = router({
  user,
});

export type TrpcRouter = typeof trpcRouter;
