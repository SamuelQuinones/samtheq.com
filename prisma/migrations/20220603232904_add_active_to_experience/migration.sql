-- AlterTable
ALTER TABLE `EducationHistory` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `inactive_timestamp` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `JobHistory` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `inactive_timestamp` TIMESTAMP(0) NULL;

-- Triggers `EducationHistory`
CREATE TRIGGER `toggle_education_active` BEFORE UPDATE ON `EducationHistory` FOR EACH ROW
BEGIN
    IF NEW.active = 0 AND OLD.active = 1 THEN 
        SET NEW.inactive_timestamp = CURRENT_TIMESTAMP;
    ELSEIF NEW.active = 1 AND OLD.active = 0 THEN 
        SET NEW.inactive_timestamp = NULL;
    END IF;
END;

-- Triggers `JobHistory`
CREATE TRIGGER `toggle_job_active` BEFORE UPDATE ON `JobHistory` FOR EACH ROW
BEGIN
    IF NEW.active = 0 AND OLD.active = 1 THEN 
        SET NEW.inactive_timestamp = CURRENT_TIMESTAMP;
    ELSEIF NEW.active = 1 AND OLD.active = 0 THEN 
        SET NEW.inactive_timestamp = NULL;
    END IF;
END;
