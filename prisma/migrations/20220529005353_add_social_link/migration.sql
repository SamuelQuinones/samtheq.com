-- CreateTable
CREATE TABLE `SocialLink` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `target` TEXT NOT NULL,
    `description` VARCHAR(255) NULL,
    `priority` INTEGER NOT NULL DEFAULT 5,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `icon_prefix` TEXT NULL,
    `icon_name` TEXT NULL,
    `redirect` VARCHAR(255) NULL,
    `created_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `inactive_timestamp` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SocialLink_title_key`(`title`),
    UNIQUE INDEX `SocialLink_redirect_key`(`redirect`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Triggers `Links`
CREATE TRIGGER `toggle_link_active` BEFORE UPDATE ON `SocialLink` FOR EACH ROW
BEGIN
    IF NEW.active = 0 AND OLD.active = 1 THEN 
        SET NEW.inactive_timestamp = CURRENT_TIMESTAMP;
    ELSEIF NEW.active = 1 AND OLD.active = 0 THEN 
        SET NEW.inactive_timestamp = NULL;
    END IF;
END;

CREATE TRIGGER `format_redirect_insert` BEFORE INSERT ON `SocialLink`FOR EACH ROW
BEGIN
    SET NEW.redirect = LOWER(REGEXP_REPLACE(NEW.redirect, '[^A-Za-z0-9]', '-'));
END;

CREATE TRIGGER `format_redirect_update` BEFORE UPDATE ON `SocialLink` FOR EACH ROW
BEGIN
    SET NEW.redirect = LOWER(REGEXP_REPLACE(NEW.redirect, '[^A-Za-z0-9]', '-'));
END;
