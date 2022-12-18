/*
  Warnings:

  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_id_fkey";

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "SliderPhoto" (
    "id" SERIAL NOT NULL,
    "photohash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contentContentID" INTEGER,

    CONSTRAINT "SliderPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SliderPhoto" ADD CONSTRAINT "SliderPhoto_contentContentID_fkey" FOREIGN KEY ("contentContentID") REFERENCES "Content"("contentID") ON DELETE SET NULL ON UPDATE CASCADE;
