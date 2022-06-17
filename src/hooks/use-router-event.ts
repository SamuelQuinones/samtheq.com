import { useEffect, useRef } from "react";
import { RouterEvent, useRouter } from "next/router";
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";

function useOnRouterEvent(
  type: RouterEvent,
  callback: (...evts: any[]) => void
) {
  const { events } = useRouter();

  // Create a ref that stores callback
  const savedHandler = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = callback;
  }, [callback]);

  useEffect(() => {
    // Create event listener that calls callback function stored in ref
    const eventListener: typeof callback = (...evts) =>
      savedHandler.current(...evts);

    events.on(type, eventListener);
    return () => {
      events.off(type, eventListener);
    };
  }, [events, type]);
}

export default useOnRouterEvent;
