-- CreateTable
CREATE TABLE `characters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `str` INTEGER NOT NULL DEFAULT 0,
    `dex` INTEGER NOT NULL DEFAULT 0,
    `con` INTEGER NOT NULL DEFAULT 0,
    `mag` INTEGER NOT NULL DEFAULT 0,
    `race_id` INTEGER NOT NULL,
    `character_class_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `characters_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `races` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `str` INTEGER NOT NULL DEFAULT 0,
    `dex` INTEGER NOT NULL DEFAULT 0,
    `con` INTEGER NOT NULL DEFAULT 0,
    `mag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `races_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `str` INTEGER NOT NULL DEFAULT 0,
    `dex` INTEGER NOT NULL DEFAULT 0,
    `con` INTEGER NOT NULL DEFAULT 0,
    `mag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `character_classes_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `character_id` INTEGER NOT NULL,
    `main_hand_id` INTEGER NULL,
    `off_hand_id` INTEGER NULL,
    `armor_id` INTEGER NULL,
    `ring_id` INTEGER NULL,
    `legs_id` INTEGER NULL,

    UNIQUE INDEX `equipments_character_id_key`(`character_id`),
    UNIQUE INDEX `equipments_main_hand_id_key`(`main_hand_id`),
    UNIQUE INDEX `equipments_off_hand_id_key`(`off_hand_id`),
    UNIQUE INDEX `equipments_armor_id_key`(`armor_id`),
    UNIQUE INDEX `equipments_ring_id_key`(`ring_id`),
    UNIQUE INDEX `equipments_legs_id_key`(`legs_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `item_types_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,
    `str` INTEGER NOT NULL DEFAULT 0,
    `dex` INTEGER NOT NULL DEFAULT 0,
    `con` INTEGER NOT NULL DEFAULT 0,
    `mag` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `items_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_damages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `damage_type` ENUM('PHYSICAL', 'FIRE', 'ICE', 'LIGHTNING', 'POISON', 'HOLY', 'DARK') NOT NULL,
    `min_damage` INTEGER NOT NULL,
    `max_damage` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_race_id_fkey` FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_character_class_id_fkey` FOREIGN KEY (`character_class_id`) REFERENCES `character_classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_main_hand_id_fkey` FOREIGN KEY (`main_hand_id`) REFERENCES `items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_off_hand_id_fkey` FOREIGN KEY (`off_hand_id`) REFERENCES `items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_armor_id_fkey` FOREIGN KEY (`armor_id`) REFERENCES `items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_ring_id_fkey` FOREIGN KEY (`ring_id`) REFERENCES `items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_legs_id_fkey` FOREIGN KEY (`legs_id`) REFERENCES `items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `item_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_damages` ADD CONSTRAINT `item_damages_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
