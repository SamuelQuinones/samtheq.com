-- CreateTable
CREATE TABLE `EducationHistory` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `degree` VARCHAR(255) NULL,
    `institution` VARCHAR(255) NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `description` VARCHAR(255) NOT NULL,
    `additional_info_1` VARCHAR(255) NULL,
    `additional_info_2` VARCHAR(255) NULL,
    `additional_info_3` VARCHAR(255) NULL,
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobHistory` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `description` VARCHAR(255) NOT NULL,
    `additional_info_1` VARCHAR(255) NULL,
    `additional_info_2` VARCHAR(255) NULL,
    `additional_info_3` VARCHAR(255) NULL,
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecentGoingsOn` (
    `GoingsOnID` INTEGER NOT NULL AUTO_INCREMENT,
    `GoingsOnTitle` VARCHAR(50) NOT NULL,
    `GoingsOnContent` LONGTEXT NOT NULL,
    `GoingsOnDate` DATE NOT NULL,
    `CheckButton` VARCHAR(50) NOT NULL DEFAULT '"No Link"',
    `PictureUrl` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`GoingsOnID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogPosts` (
    `PostID` INTEGER NOT NULL AUTO_INCREMENT,
    `PostTitle` VARCHAR(50) NOT NULL,
    `PostContent` LONGTEXT NOT NULL,
    `PostDate` DATE NOT NULL,
    `postMonth` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`PostID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
