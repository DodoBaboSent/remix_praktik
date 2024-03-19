-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'moderator'
);

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

-- CreateTable
CREATE TABLE "PhotoAlbum" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "thumb" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Img" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "photoAlbumId" TEXT,
    CONSTRAINT "Img_photoAlbumId_fkey" FOREIGN KEY ("photoAlbumId") REFERENCES "PhotoAlbum" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "parentId" TEXT,
    CONSTRAINT "SLink_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "SLink" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TechGroup_name_key" ON "TechGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoAlbum_name_key" ON "PhotoAlbum"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SLink_link_key" ON "SLink"("link");
