import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { StoreCategory } from "@prisma/client"; // Import the Prisma enum
import { publicProcedure, router } from "./appRouter";

const prisma = new PrismaClient();

export const restaurantRouter = router({
  // getRestaurants: publicProcedure.query(async () => {
  //   return await prisma.restaurant.findMany();
  // }),

  getRestaurants: publicProcedure
  .input(z.object({
    categoryValue: z.string().optional(),
    name: z.string().optional(),
  }))
  .query(async ({ input }) => {
    return prisma.restaurant.findMany({
      where: {
        category: { value: input.categoryValue as StoreCategory },
        ...(input.name ? { name: { contains: input.name, mode: 'insensitive' } } : {}),
      },
      include: {
        category: true,
        featured: true,
      },
      orderBy: {
        name: 'asc', // Order by name in ascending order
      },
    });
  }),

  addFavorite: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: input },
    });

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return await prisma.restaurant.update({
      where: { id: input },
      data: { isFavorite: !restaurant.isFavorite },
    });
  }),
});

export type restaurantRouter = typeof restaurantRouter;