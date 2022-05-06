import type { EducationHistory, JobHistory } from "@prisma/client";
import { formatUTC } from "@util/DateHelper";

type ExperienceHistory = EducationHistory | JobHistory;

type ModifyProperties<T extends ExperienceHistory> = Omit<
  T,
  | "additional_info_1"
  | "additional_info_2"
  | "additional_info_3"
  | "start_date"
  | "end_date"
  | "ID"
  | "modified_timestamp"
> & {
  start_date: string;
  end_date: string | null;
  additionalInfo?: string[];
};

type AddCategory<
  T extends ExperienceHistory,
  C extends string
> = ModifyProperties<T> & {
  category: C;
};

export type TResume = {
  lastUpdated: string;
  experienceItems: Array<
    AddCategory<JobHistory, "work"> | AddCategory<EducationHistory, "education">
  >;
};

export function formatExperience<
  T extends Omit<ExperienceHistory, "ID" | "modified_timestamp">,
  C extends string
>(data: T, category: C) {
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
    category,
    start_date: startDate,
    end_date: endDate,
    additionalInfo: additionalInfo,
  };
}
