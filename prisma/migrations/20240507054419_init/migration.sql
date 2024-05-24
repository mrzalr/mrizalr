-- CreateTable
CREATE TABLE `options` (
    `Category` VARCHAR(100) NOT NULL,
    `Value` VARCHAR(200) NOT NULL,
    `CreatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `UpdatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `options_Category_key`(`Category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `ID` VARCHAR(36) NOT NULL,
    `Title` VARCHAR(255) NOT NULL,
    `ImageUrl` TEXT NULL,
    `Published` BOOLEAN NOT NULL DEFAULT false,
    `Short` TEXT NOT NULL,
    `Content` LONGTEXT NOT NULL,
    `CreatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `UpdatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `notes_ID_key`(`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
