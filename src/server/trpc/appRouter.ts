import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson, // Allows complex data serialization, Important for transforming data
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
