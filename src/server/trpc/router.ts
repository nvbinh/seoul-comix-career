import { router } from './appRouter';
// import { restaurantRouter } from './restaurant';
import { restaurantMockRouter } from './restaurantMock';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

console.log('NODE_ENV:', process.env.NODE_ENV); // Add this line for debugging

export const appRouter = router({
  // restaurant: process.env.NODE_ENV === 'production' ? restaurantMockRouter : restaurantRouter,
  restaurant: restaurantMockRouter,
});

export type AppRouter = typeof appRouter;
