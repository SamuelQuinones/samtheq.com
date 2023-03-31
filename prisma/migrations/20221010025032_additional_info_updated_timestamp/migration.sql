-- CreateTrigger
CREATE TRIGGER `update_linked_experience_item` AFTER UPDATE ON `ExperienceInfo` FOR EACH ROW
BEGIN
    UPDATE `ExperienceHistory`
    SET modified_timestamp = CURRENT_TIMESTAMP
    WHERE ID = NEW.experience_id;
END;
