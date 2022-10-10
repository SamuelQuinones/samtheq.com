import type { ExperienceHistory } from "@prisma/client";

type ExperienceItem = Pick<
  ExperienceHistory,
  "ID" | "description" | "signifier" | "place" | "exp_type"
> & {
  start_date: string;
  end_date: string | null;
  additional_info: string[];
};

export type TResume = {
  lastUpdated: string;
  experienceItems: ExperienceItem[];
  fetchFailed: boolean;
};
