// TODO: December 30th, 2023 - Experiment with the new clsx/lite
import clsx, { type ClassValue } from "clsx";
// TODO: This has a 7kb overhead, see what can be done to remove it
import { twMerge } from "tailwind-merge";

export default function twClsx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
