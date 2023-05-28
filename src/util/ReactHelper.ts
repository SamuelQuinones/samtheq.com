import type { RefObject } from "react";

/**
 * Helper function that will resolve the input arguement to a HTML element if possible
 *
 * @param target either a HTML ekement or a ref object pointing to a HTML element
 */
export function resolveElement<T extends HTMLElement>(target: T | RefObject<T>) {
  if (target && "current" in target) return target.current;
  if (target?.nodeType) return target;
  return null;
}
