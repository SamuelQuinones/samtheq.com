import { createContext, useContext } from "react";

export interface IUpdateContext {
  prepareMessage: (msg: string) => void;
}

export const UpdateContext = createContext<IUpdateContext | null>(null);

export const useUpdateCard = () => {
  const context = useContext(UpdateContext);

  if (!context && process.env.NODE_ENV === "development") {
    throw Error(
      "Please make sure this component is contained within the Update Card Container"
    );
  } else {
    return context as IUpdateContext;
  }
};
