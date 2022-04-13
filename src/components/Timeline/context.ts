import { createContext, useContext } from "react";

export interface PrepareModalArgs {
  additionalInfo: string[];
  title: string;
}

export interface ITimelineContext {
  registerCategory: (c: string) => void;
  prepareModal: (args: PrepareModalArgs) => void;
}

export const TimelineContext = createContext<ITimelineContext | null>(null);

export const useTimelineItem = () => {
  const context = useContext(TimelineContext);

  if (!context && process.env.NODE_ENV === "development") {
    throw Error(
      "Please make sure this component is contained within the Timeline Container"
    );
  } else {
    return context as ITimelineContext;
  }
};
