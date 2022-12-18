/*
  Warnings:

  - The primary key for the `Content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_id_fkey";

-- AlterTable
ALTER TABLE "Content" DROP CONSTRAINT "Content_pkey",
DROP COLUMN "id",
ADD COLUMN     "contentID" SERIAL NOT NULL,
ADD CONSTRAINT "Content_pkey" PRIMARY KEY ("contentID");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_fkey" FOREIGN KEY ("id") REFERENCES "Content"("contentID") ON DELETE RESTRICT ON UPDATE CASCADE;
