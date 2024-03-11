/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TechGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TechGroup_name_key" ON "TechGroup"("name");
