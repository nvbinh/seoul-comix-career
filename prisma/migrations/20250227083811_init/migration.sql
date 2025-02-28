-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "favorites" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
