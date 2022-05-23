/*
  Warnings:

  - A unique constraint covering the columns `[listId]` on the table `lists` will be added. If there are existing duplicate values, this will fail.
  - Made the column `listId` on table `lists` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lists" ALTER COLUMN "listId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lists_listId_key" ON "lists"("listId");
