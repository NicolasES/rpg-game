-- AlterTable
ALTER TABLE `characters` ADD COLUMN `experience` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `hunting_areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `hunting_areas_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hunting_area_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hunting_area_id` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,

    UNIQUE INDEX `hunting_area_levels_hunting_area_id_level_key`(`hunting_area_id`, `level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hunting_area_progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `character_id` INTEGER NOT NULL,
    `hunting_area_id` INTEGER NOT NULL,
    `highest_level_unlocked` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `hunting_area_progress_character_id_hunting_area_id_key`(`character_id`, `hunting_area_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monsters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hp` INTEGER NOT NULL,
    `base_exp` INTEGER NOT NULL,
    `str` INTEGER NOT NULL DEFAULT 6,
    `dex` INTEGER NOT NULL DEFAULT 6,
    `con` INTEGER NOT NULL DEFAULT 6,
    `mag` INTEGER NOT NULL DEFAULT 6,

    UNIQUE INDEX `monsters_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hunting_area_level_monsters` (
    `hunting_area_level_id` INTEGER NOT NULL,
    `monster_id` INTEGER NOT NULL,

    PRIMARY KEY (`hunting_area_level_id`, `monster_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hunting_area_levels` ADD CONSTRAINT `hunting_area_levels_hunting_area_id_fkey` FOREIGN KEY (`hunting_area_id`) REFERENCES `hunting_areas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hunting_area_progress` ADD CONSTRAINT `hunting_area_progress_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hunting_area_progress` ADD CONSTRAINT `hunting_area_progress_hunting_area_id_fkey` FOREIGN KEY (`hunting_area_id`) REFERENCES `hunting_areas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hunting_area_level_monsters` ADD CONSTRAINT `hunting_area_level_monsters_hunting_area_level_id_fkey` FOREIGN KEY (`hunting_area_level_id`) REFERENCES `hunting_area_levels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hunting_area_level_monsters` ADD CONSTRAINT `hunting_area_level_monsters_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
