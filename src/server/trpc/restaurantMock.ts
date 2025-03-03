/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { publicProcedure, router } from "./appRouter";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../data/restaurants.json');

function readData() {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const restaurantMockRouter = router({
  getRestaurants: publicProcedure
    .input(z.object({
      categoryValue: z.string().optional(),
      name: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const restaurants = readData();
      return restaurants.filter((restaurant: any) => {
        const matchesCategory = input.categoryValue ? restaurant.category.value === input.categoryValue : true;
        const matchesName = input.name ? restaurant.name.toLowerCase().includes(input.name.toLowerCase()) : true;
        return matchesCategory && matchesName;
      }).sort((a: any, b: any) => a.name.localeCompare(b.name));
    }),

  addFavorite: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const restaurants = readData();
    const restaurant = restaurants.find((r: any) => r.id === input);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    restaurant.isFavorite = !restaurant.isFavorite;
    writeData(restaurants);

    return restaurant;
  }),
});

export type restaurantMockRouter = typeof restaurantMockRouter;