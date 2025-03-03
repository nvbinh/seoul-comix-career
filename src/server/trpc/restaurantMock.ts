/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { publicProcedure, router } from "./appRouter";

const dataUrl = 'http://localhost:3000/data/restaurants.json';

async function fetchData() {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function writeData(data: any) {
  // Writing data back to the JSON file is not supported in a serverless environment like Vercel.
  // You would need to use a database or another persistent storage solution.
  throw new Error('Writing data is not supported in this environment');
}

export const restaurantMockRouter = router({
  getRestaurants: publicProcedure
    .input(z.object({
      categoryValue: z.string().optional(),
      name: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const restaurants = await fetchData();
      return restaurants.filter((restaurant: any) => {
        const matchesCategory = input.categoryValue ? restaurant.category.value === input.categoryValue : true;
        const matchesName = input.name ? restaurant.name.toLowerCase().includes(input.name.toLowerCase()) : true;
        return matchesCategory && matchesName;
      }).sort((a: any, b: any) => a.name.localeCompare(b.name));
    }),

  addFavorite: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const restaurants = await fetchData();
    const restaurant = restaurants.find((r: any) => r.id === input);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    restaurant.isFavorite = !restaurant.isFavorite;
    await writeData(restaurants);

    return restaurant;
  }),
});

export type restaurantMockRouter = typeof restaurantMockRouter;