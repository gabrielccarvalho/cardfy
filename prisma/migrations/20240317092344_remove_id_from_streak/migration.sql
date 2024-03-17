/*
  Warnings:

  - The primary key for the `Streak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Streak` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Streak" (
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "flashcardId" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Streak_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Streak" ("date", "flashcardId", "repetitions", "userId") SELECT "date", "flashcardId", "repetitions", "userId" FROM "Streak";
DROP TABLE "Streak";
ALTER TABLE "new_Streak" RENAME TO "Streak";
CREATE UNIQUE INDEX "Streak_flashcardId_key" ON "Streak"("flashcardId");
CREATE INDEX "Streak_flashcardId_idx" ON "Streak"("flashcardId");
CREATE INDEX "Streak_userId_idx" ON "Streak"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
