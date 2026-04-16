/*
  Warnings:

  - Added the required column `user_id` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `characters` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
