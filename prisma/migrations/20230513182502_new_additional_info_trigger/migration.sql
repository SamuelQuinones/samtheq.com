-- CreateTrigger
CREATE TRIGGER `create_linked_experience_item` AFTER INSERT ON `ExperienceInfo` FOR EACH ROW
BEGIN
    UPDATE `ExperienceHistory`
    SET modified_timestamp = CURRENT_TIMESTAMP
    WHERE ID = NEW.experience_id;
END;
