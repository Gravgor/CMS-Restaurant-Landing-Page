-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "photohash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_fkey" FOREIGN KEY ("id") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
