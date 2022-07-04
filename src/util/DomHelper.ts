import type { RefObject } from "react";

/**
 * utility wrapper for `{ELEMENT}.querySelector()`
 */
export function qs<T extends HTMLElement>(
  element: T | Document,
  selectors: string
) {
  return element.querySelector<HTMLElement>(selectors);
}

/**
 * utility wrapper for `{ELEMENT}.querySelectorAll()`
 */
export function qsa<T extends HTMLElement>(
  element: T | Document,
  selectors: string
): HTMLElement[] {
  return Array.from(element.querySelectorAll(selectors));
}

export function contains(context: Element, node: Element) {
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }
}

/**
 * Helper function that will resolve the input arguement to a HTML element if possible
 *
 * @param target either a HTML ekement or a ref object pointing to a HTML element
 */
export function resolveElement<T extends HTMLElement>(
  target: T | RefObject<T>
) {
  if (target && "current" in target) return target.current;
  if (target?.nodeType) return target;
  return null;
}
