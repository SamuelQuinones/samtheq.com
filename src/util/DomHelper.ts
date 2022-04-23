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

export const getBodyScrollbarWidth = () => {
  const myWindow = document.defaultView;
  if (!myWindow) return 0;
  return Math.abs(myWindow.innerWidth - document.documentElement.clientWidth);
};

function setDataAttribute<T extends keyof CSSStyleDeclaration>(
  element: HTMLElement,
  styleProp: T,
  value: string
) {
  element.setAttribute(`data-stq-${styleProp}`, value);
}

function removeDataAttribute<T extends keyof CSSStyleDeclaration>(
  element: HTMLElement,
  styleProp: T
) {
  element.removeAttribute(`data-stq-${styleProp}`);
}

export function setElementStyles<T extends keyof CSSStyleDeclaration>(
  selector: string,
  styleProp: T,
  callback: (v: CSSStyleDeclaration[T]) => CSSStyleDeclaration[T]
) {
  // const Elements = document.querySelectorAll<HTMLElement>(selector);
  const Elements = qsa(document, selector);
  if (!Elements) return;
  Elements.forEach((e) => {
    const actualValue = e.style[styleProp];
    if (actualValue) setDataAttribute(e, styleProp, actualValue as string);

    const calcVal = window.getComputedStyle(e)[styleProp];
    e.style[styleProp] = callback(calcVal);
  });
}

export function resetElementStyles<T extends keyof CSSStyleDeclaration>(
  selector: string,
  styleProp: T
) {
  // const Elements = document.querySelectorAll<HTMLElement>(selector);
  const Elements = qsa(document, selector);
  if (!Elements) return;
  Elements.forEach((e) => {
    const dataEl = e.getAttribute(`data-stq-${styleProp}`);
    if (dataEl === null) {
      e.style[styleProp] = "" as CSSStyleDeclaration[T];
    } else {
      removeDataAttribute(e, styleProp);
      e.style[styleProp] = dataEl as CSSStyleDeclaration[T];
    }
  });
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
