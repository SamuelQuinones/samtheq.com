import type { ExperienceHistory } from "@prisma/client";
import { formatUTC } from "@util/DateHelper";

type ExperienceItem = Omit<
  ExperienceHistory,
  | "active"
  | "modified_timestamp"
  | "inactive_timestamp"
  | "start_date"
  | "end_date"
  | "additional_info_1"
  | "additional_info_2"
  | "additional_info_3"
> & {
  start_date: string;
  end_date: string | null;
  additionalInfo: string[];
};

export type TResume = {
  lastUpdated: string;
  experienceItems: Array<ExperienceItem>;
};

export function formatExperience<
  T extends Omit<
    ExperienceHistory,
    "modified_timestamp" | "active" | "inactive_timestamp"
  >
>(data: T) {
  const {
    additional_info_1,
    additional_info_2,
    additional_info_3,
    start_date,
    end_date,
    ...experienceItem
  } = data;
  const additionalInfo: string[] = [];
  if (additional_info_1) additionalInfo.push(additional_info_1);
  if (additional_info_2) additionalInfo.push(additional_info_2);
  if (additional_info_3) additionalInfo.push(additional_info_3);

  const startDate = formatUTC(start_date, "MMMM YYYY");
  const endDate = end_date ? formatUTC(end_date, "MMMM YYYY") : null;

  return {
    ...experienceItem,
    start_date: startDate,
    end_date: endDate,
    additionalInfo: additionalInfo,
  };
}
