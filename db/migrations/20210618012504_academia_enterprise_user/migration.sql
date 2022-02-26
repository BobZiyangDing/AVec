/*
  Warnings:

  - Added the required column `needSynth` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "goi" TEXT NOT NULL,
    "throughput" INTEGER NOT NULL,
    "ecoliType" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'order received',
    "price" INTEGER NOT NULL,
    "payment" TEXT NOT NULL DEFAULT 'credit card',
    "seqType" TEXT NOT NULL DEFAULT 'dna',
    "needSynth" BOOLEAN NOT NULL,
    "hasDataplot" BOOLEAN NOT NULL,
    "hasDataset" BOOLEAN NOT NULL,
    "hasModel" BOOLEAN NOT NULL,
    "topSequence" TEXT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "createdAt", "updatedAt", "name", "number", "goi", "throughput", "ecoliType", "condition", "description", "status", "price", "payment", "topSequence", "hasDataplot", "hasDataset", "hasModel", "userId", "addressId") SELECT "id", "createdAt", "updatedAt", "name", "number", "goi", "throughput", "ecoliType", "condition", "description", "status", "price", "payment", "topSequence", "hasDataplot", "hasDataset", "hasModel", "userId", "addressId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "version" TEXT NOT NULL DEFAULT 'ENTERPRISE'
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
