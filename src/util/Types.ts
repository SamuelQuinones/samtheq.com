export type TResumeCommon<T extends string> = {
  startDate: string | Date;
  endDate?: string | Date;
  title: string;
  category: T;
  additionalInfo?: string[];
  description: string;
};
export type TResumeWork = TResumeCommon<"work"> & {
  company?: string;
};
export type TResumeEducation = TResumeCommon<"education"> & {
  degree?: string;
};

export type TResumeAPI = {
  lastUpdated: string;
  experienceItems: Array<TResumeWork | TResumeEducation>;
};
