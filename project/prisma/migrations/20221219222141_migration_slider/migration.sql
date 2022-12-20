/*
  Warnings:

  - You are about to drop the `SliderPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SliderPhoto" DROP CONSTRAINT "SliderPhoto_contentContentID_fkey";

-- DropTable
DROP TABLE "SliderPhoto";
