/*
  Warnings:

  - You are about to drop the column `description` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `favorites` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFavorite` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_range` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating_count` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoreCategory" AS ENUM ('SUSHI', 'UNAGI', 'TEMPURA', 'TONKATSU', 'YAKITORI', 'SUKIYAKI', 'SOBA', 'RAMEN', 'YAKISOBA', 'OKONOMIYAKI', 'DONBURI', 'ODEN', 'KAISEKI', 'HAMBAGU', 'TEPPANYAKI', 'CURRY', 'YAKINIKU', 'NABE', 'CAFE', 'IZAKAYA', 'OTHER');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "description",
DROP COLUMN "favorites",
DROP COLUMN "image",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "featuredId" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL,
ADD COLUMN     "price_range" TEXT NOT NULL,
ADD COLUMN     "rating_count" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Featured" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Featured_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "value" "StoreCategory" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_featuredId_fkey" FOREIGN KEY ("featuredId") REFERENCES "Featured"("id") ON DELETE SET NULL ON UPDATE CASCADE;
