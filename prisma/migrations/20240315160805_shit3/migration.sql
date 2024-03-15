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
