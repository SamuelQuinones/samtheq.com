/*
  Warnings:

  - You are about to drop the column `additional_info_1` on the `ExperienceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `additional_info_2` on the `ExperienceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `additional_info_3` on the `ExperienceHistory` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE `ExperienceInfo` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `info` VARCHAR(255) NOT NULL,
    `experience_id` INTEGER NOT NULL,
    `modified_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- UpdateTable
INSERT INTO `ExperienceInfo` (
    `info`,
    `experience_id`
) SELECT 
    `info`,
    `experience_id`
    FROM (
        SELECT CONCAT(ID,1) as `sort_order`, `additional_info_1` as `info`, `ID` as `experience_id` from `ExperienceHistory` WHERE `additional_info_1` IS NOT NULL
        UNION
        SELECT CONCAT(ID,2) as `sort_order`, `additional_info_2` as `info`, `ID` as `experience_id` from `ExperienceHistory` WHERE `additional_info_2` IS NOT NULL
        UNION
        SELECT CONCAT(ID,3) as `sort_order`, `additional_info_3` as `info`, `ID` as `experience_id` from `ExperienceHistory` WHERE `additional_info_3` IS NOT NULL
    ) as i ORDER BY `experience_id` ASC, `sort_order` ASC
;

-- AlterTable
ALTER TABLE `ExperienceHistory` DROP COLUMN `additional_info_1`,
    DROP COLUMN `additional_info_2`,
    DROP COLUMN `additional_info_3`;
