import { useState } from "react";
import useEventListener from "./use-event-listener";
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";

interface WindowSize {
  width: number;
  height: number;
}

function useWindowResize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEventListener("window", "resize", handleResize);
  useIsomorphicLayoutEffect(() => {
    handleResize();
  }, []);

  return windowSize;
}

export default useWindowResize;
