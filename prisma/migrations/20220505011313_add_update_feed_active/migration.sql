-- AlterTable
ALTER TABLE `UpdateFeed` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `inactive_timestamp` TIMESTAMP(0) NULL;

-- Triggers `UpdateFeed`
CREATE TRIGGER `set_inactive_timestamp` BEFORE UPDATE ON `UpdateFeed` FOR EACH ROW
BEGIN
    IF NEW.active = 0 AND OLD.active = 1 THEN 
        SET NEW.inactive_timestamp = CURRENT_TIMESTAMP;
	  ELSEIF NEW.active = 1 AND OLD.active = 0 THEN 
		    SET NEW.inactive_timestamp = NULL;
	  END IF;
END;
