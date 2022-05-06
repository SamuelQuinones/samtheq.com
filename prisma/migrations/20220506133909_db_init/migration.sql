-- CreateTable
CREATE TABLE `EducationHistory` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `institution` VARCHAR(255) NOT NULL,
    `degree` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `description` VARCHAR(255) NOT NULL,
    `additional_info_1` VARCHAR(255) NULL,
    `additional_info_2` VARCHAR(255) NULL,
    `additional_info_3` VARCHAR(255) NULL,
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobHistory` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `description` VARCHAR(255) NOT NULL,
    `additional_info_1` VARCHAR(255) NULL,
    `additional_info_2` VARCHAR(255) NULL,
    `additional_info_3` VARCHAR(255) NULL,
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UpdateFeed` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `preview_text` VARCHAR(100) NULL,
    `check_it_out_link` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `update_card_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `inactive_timestamp` TIMESTAMP(0) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Triggers `UpdateFeed`
CREATE TRIGGER `set_inactive_timestamp` BEFORE UPDATE ON `UpdateFeed` FOR EACH ROW
BEGIN
    IF NEW.active = 0 AND OLD.active = 1 THEN 
        SET NEW.inactive_timestamp = CURRENT_TIMESTAMP;
    ELSEIF NEW.active = 1 AND OLD.active = 0 THEN 
        SET NEW.inactive_timestamp = NULL;
    END IF;
END;

