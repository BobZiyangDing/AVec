/*
  Warnings:

  - You are about to drop the `Dataplot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dataset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Dataset_orderId_unique";

-- DropIndex
DROP INDEX "Dataplot_orderId_unique";

-- DropIndex
DROP INDEX "Model_orderId_unique";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "dataplotDir" TEXT;
ALTER TABLE "Order" ADD COLUMN "datasetDir" TEXT;
ALTER TABLE "Order" ADD COLUMN "modelDir" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dataplot";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dataset";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Model";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT DEFAULT '',
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "phone" TEXT DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'USER',
    "version" TEXT NOT NULL DEFAULT 'ENTERPRISE'
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role", "version", "phone") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role", "version", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
