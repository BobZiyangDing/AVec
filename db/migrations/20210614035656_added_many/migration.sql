/*
  Warnings:

  - Added the required column `hasDataplot` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDataset` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasModel` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Dataplot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "dir" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dataset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "dir" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "dir" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "throughput" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'order received',
    "price" INTEGER NOT NULL,
    "payment" TEXT NOT NULL DEFAULT 'credit card',
    "hasDataplot" BOOLEAN NOT NULL,
    "hasDataset" BOOLEAN NOT NULL,
    "hasModel" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "createdAt", "updatedAt", "name", "number", "description", "throughput", "status", "price", "payment", "userId", "addressId") SELECT "id", "createdAt", "updatedAt", "name", "number", "description", "throughput", "status", "price", "payment", "userId", "addressId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Dataplot_orderId_unique" ON "Dataplot"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_orderId_unique" ON "Dataset"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Model_orderId_unique" ON "Model"("orderId");
