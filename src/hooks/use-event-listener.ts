import { RefObject, useEffect, useRef } from "react";

import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";

function useEventListener<K extends keyof WindowEventMap>(
  element: "window",
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<K extends keyof DocumentEventMap>(
  element: "document",
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  element: RefObject<T>,
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KD extends keyof DocumentEventMap,
  T extends HTMLElement
>(
  element: "window" | "document" | RefObject<T>,
  eventName: KW | KH | KD,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | DocumentEventMap[KD]
      | Event
  ) => void,
  options?: boolean | AddEventListenerOptions
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the listening target
    let targetElement: T | Document | Window;
    switch (element) {
      case "document":
        targetElement = document;
        break;
      case "window":
        targetElement = window;
        break;
      default:
        targetElement = element?.current || window;
        break;
    }
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) =>
      savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

export default useEventListener;
