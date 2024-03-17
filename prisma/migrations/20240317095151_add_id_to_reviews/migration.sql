/*
  Warnings:

  - The required column `id` was added to the `Reviews` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "flashcardId" TEXT NOT NULL,
    CONSTRAINT "Reviews_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("date", "flashcardId") SELECT "date", "flashcardId" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
CREATE UNIQUE INDEX "Reviews_flashcardId_key" ON "Reviews"("flashcardId");
CREATE INDEX "Reviews_flashcardId_idx" ON "Reviews"("flashcardId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
