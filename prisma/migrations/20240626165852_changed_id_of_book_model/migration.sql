/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "bar_code" TEXT NOT NULL
);
INSERT INTO "new_books" ("bar_code", "description", "id", "title") SELECT "bar_code", "description", "id", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");
CREATE UNIQUE INDEX "books_bar_code_key" ON "books"("bar_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
