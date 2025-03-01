import { publicProcedure, router } from './appRouter';
import { z } from 'zod';
import { restaurantRouter } from './restaurant'; 

export const appRouter = router({
  hello: publicProcedure.input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { message: `Hello, ${input.name ?? 'World'}!` };
    }),

  restaurant: restaurantRouter,
  // hello: publicProcedure.query(() => {
  //   console.log('🎯 tRPC Query Executed:', { message: 'Hello, World!' });
  //   return { message: 'Hello, World!' };
  // }),
});

export type AppRouter = typeof appRouter;
