/*
  Warnings:

  - Made the column `degree` on table `EducationHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution` on table `EducationHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `JobHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `JobHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `EducationHistory` MODIFY `degree` VARCHAR(255) NOT NULL,
    MODIFY `institution` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `JobHistory` MODIFY `company` VARCHAR(255) NOT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;
