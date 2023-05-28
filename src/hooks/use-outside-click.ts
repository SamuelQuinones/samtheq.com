import { contains } from "@/util/DomHelper";
import { resolveElement } from "@/util/ReactHelper";
import type { RefObject } from "react";
import useEventListener from "./use-event-listener";

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | T,
  handler: (event: MouseEvent) => void,
  mouseEvent: "mousedown" | "mouseup" | "pointerdown" = "mousedown"
): void {
  useEventListener("window", mouseEvent, (event) => {
    const el = resolveElement<T>(ref);
    // Do nothing if clicking ref's element or descendent elements
    if (!el || contains(el, event.target as Element)) {
      return;
    }
    handler(event);
  });
}

export default useOutsideClick;
