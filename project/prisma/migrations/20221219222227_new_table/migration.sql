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
