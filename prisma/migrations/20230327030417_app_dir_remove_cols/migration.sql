/*
  Warnings:

  - You are about to drop the column `description` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `preview_text` on the `UpdateFeed` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `SocialLink` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `UpdateFeed` DROP COLUMN `preview_text`;
