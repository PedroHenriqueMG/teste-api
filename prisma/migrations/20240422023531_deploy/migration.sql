/*
  Warnings:

  - You are about to drop the `Teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Teste";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'https://i.pravatar.cc/150',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
