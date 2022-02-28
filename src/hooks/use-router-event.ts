import { useEffect } from "react";
import { RouterEvent, useRouter } from "next/router";

function useOnRouterEvent(type: RouterEvent, callback: () => void) {
  const { events } = useRouter();

  useEffect(() => {
    events.on(type, callback);
    return () => {
      events.off(type, callback);
    };
  }, [callback, events, type]);
}

export default useOnRouterEvent;
