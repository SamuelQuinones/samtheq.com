/**
 * utility wrapper for `{ELEMENT}.querySelector()`
 */
export function qs<T extends HTMLElement>(element: T | Document, selectors: string) {
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
