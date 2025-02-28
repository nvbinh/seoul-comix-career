// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.restaurant.createMany({
    data: [
      {
        id: "1",
        name: "The Best Pizza",
        description: "Authentic Italian-style pizza with fresh ingredients.",
        rating: 4.8,
        image: "https://source.unsplash.com/400x300/?pizza",
        favorites: 0,
      },
      {
        id: "2",
        name: "Sushi Express",
        description: "Fast and fresh sushi with premium-grade fish.",
        rating: 4.7,
        image: "https://source.unsplash.com/400x300/?sushi",
        favorites: 0,
      },
      {
        id: "3",
        name: "Burger House",
        description: "Juicy handcrafted burgers with homemade sauces.",
        rating: 4.5,
        image: "https://source.unsplash.com/400x300/?burger",
        favorites: 0,
      },
    ],
  });

  console.log("Seed data added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
