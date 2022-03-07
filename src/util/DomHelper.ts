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
  const Elements = document.querySelectorAll<HTMLElement>(selector);
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
  const Elements = document.querySelectorAll<HTMLElement>(selector);
  if (!Elements) return;
  Elements.forEach((e) => {
    const dataEl = e.getAttribute(`data-pw-${styleProp}`);
    if (dataEl === null) {
      e.style[styleProp] = "" as CSSStyleDeclaration[T];
    } else {
      removeDataAttribute(e, styleProp);
      e.style[styleProp] = dataEl as CSSStyleDeclaration[T];
    }
  });
}
