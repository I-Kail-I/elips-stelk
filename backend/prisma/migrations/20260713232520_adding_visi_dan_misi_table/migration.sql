-- CreateTable
CREATE TABLE "visi_dan_misi" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "visi_dan_misi_pkey" PRIMARY KEY ("id")
);
