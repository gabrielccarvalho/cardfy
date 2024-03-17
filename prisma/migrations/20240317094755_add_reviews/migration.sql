-- CreateTable
CREATE TABLE "Reviews" (
    "date" DATETIME NOT NULL,
    "flashcardId" TEXT NOT NULL,
    CONSTRAINT "Reviews_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_flashcardId_key" ON "Reviews"("flashcardId");

-- CreateIndex
CREATE INDEX "Reviews_flashcardId_idx" ON "Reviews"("flashcardId");
