-- CreateTable
CREATE TABLE "TechGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tech" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quant" INTEGER NOT NULL,
    "techGroupId" TEXT,
    CONSTRAINT "Tech_techGroupId_fkey" FOREIGN KEY ("techGroupId") REFERENCES "TechGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TechImg" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "techGroupId" TEXT,
    CONSTRAINT "TechImg_techGroupId_fkey" FOREIGN KEY ("techGroupId") REFERENCES "TechGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
