import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
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
        category: { value: input.categoryValue },
        ...(input.name ? { name: { contains: input.name, mode: 'insensitive' } } : {}),
      },
      include: {
        category: true,
        featured: true,
      },
    });
  }),

  addFavorite: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.restaurant.update({
      where: { id: input },
      data: { favorites: { increment: 1 } },
    });
  }),
});

export type restaurantRouter = typeof restaurantRouter;