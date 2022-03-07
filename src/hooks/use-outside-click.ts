import { RefObject } from "react";
import useEventListener from "./use-event-listener";

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener("window", mouseEvent, (event) => {
    const el = ref?.current;
    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  });
}

export default useOutsideClick;
