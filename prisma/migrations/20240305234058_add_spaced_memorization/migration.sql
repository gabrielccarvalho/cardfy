-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flashcard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "easeFactor" REAL NOT NULL DEFAULT 2.5,
    "nextReviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Flashcard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flashcard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Flashcard" ("answer", "categoryId", "id", "question", "slug", "userId") SELECT "answer", "categoryId", "id", "question", "slug", "userId" FROM "Flashcard";
DROP TABLE "Flashcard";
ALTER TABLE "new_Flashcard" RENAME TO "Flashcard";
CREATE INDEX "Flashcard_categoryId_idx" ON "Flashcard"("categoryId");
CREATE INDEX "Flashcard_userId_idx" ON "Flashcard"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
