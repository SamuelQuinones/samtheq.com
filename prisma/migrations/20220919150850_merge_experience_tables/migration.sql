/*
  Warnings:

  - You are about to drop the `EducationHistory` table. If the table is not empty, all the data it contains will be lost. It should be copied into the ExperienceHistory table

*/
-- RenameTable
RENAME TABLE `JobHistory` TO `ExperienceHistory`;

-- RenameColumns
ALTER TABLE `ExperienceHistory` RENAME COLUMN `company` TO `place`;
ALTER TABLE `ExperienceHistory` RENAME COLUMN `title` TO `signifier`;

-- AlterTable
ALTER TABLE `ExperienceHistory` ADD COLUMN `exp_type` VARCHAR(255) NOT NULL DEFAULT 'work' AFTER `signifier`;

-- Add EducationData
INSERT INTO `ExperienceHistory` (
    `place`,
    `signifier`,
    `start_date`,
    `end_date`,
    `description`,
    `additional_info_1`,
    `additional_info_2`,
    `additional_info_3`,
    `active`,
    `inactive_timestamp`,
    `exp_type`
) SELECT 
    `institution`,
    `degree`,
    `start_date`,
    `end_date`,
    `description`,
    `additional_info_1`,
    `additional_info_2`,
    `additional_info_3`,
    `active`,
    `inactive_timestamp`,
    'education' as `exp_type`
  FROM `EducationHistory`
;

-- DropTable
DROP TABLE `EducationHistory`;
