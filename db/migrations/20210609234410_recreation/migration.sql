/*
  Warnings:

  - Made the column `userId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT 'no address needed for deliver',
    "description" TEXT NOT NULL,
    "throughput" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'order received',
    "price" TEXT NOT NULL,
    "payment" TEXT NOT NULL DEFAULT 'credit card',
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "createdAt", "updatedAt", "name", "number", "description", "throughput", "status", "price", "payment", "userId") SELECT "id", "createdAt", "updatedAt", "name", "number", "description", "throughput", "status", "price", "payment", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
