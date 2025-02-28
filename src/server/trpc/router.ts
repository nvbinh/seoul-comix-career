// import { router } from "./trpc";
// import { restaurantRouter } from "./restaurant";

// export const appRouter = router({
//   restaurant: restaurantRouter,
// });

// export type AppRouter = typeof appRouter;


import { publicProcedure, router } from './appRouter';
import { z } from 'zod';
import { restaurantRouter } from './restaurant'; 

console.log("3: appRouter is being initialized!"); // Debugging log


export const appRouter = router({
  hello: publicProcedure.input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      console.log('5: tRPC Response:', { message: `Hello, ${input.name ?? 'World'}!` });
      return { message: `Hello, ${input.name ?? 'World'}!` };
    }),

  restaurant: restaurantRouter,
  // hello: publicProcedure.query(() => {
  //   console.log('🎯 tRPC Query Executed:', { message: 'Hello, World!' });
  //   return { message: 'Hello, World!' };
  // }),
  
});

export type AppRouter = typeof appRouter;
