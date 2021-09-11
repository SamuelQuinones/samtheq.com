import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Because NextJS does not seem to properly reset focus on route change,
 * this function will take care of that via a quick hack to force focus on the body
 */
function useResetFocus() {
  const { events } = useRouter();

  const _focus = () => {
    document.body.setAttribute("tabIndex", "-1");
    document.body.focus();
  };
  const _reset = () => {
    document.body.removeAttribute("tabIndex");
  };

  useEffect(() => {
    events.on("routeChangeStart", _focus);
    events.on("routeChangeComplete", _reset);

    return () => {
      events.off("routeChangeStart", _focus);
      events.off("routeChangeComplete", _reset);
    };
  }, [events]);
}

export default useResetFocus;
