import { useEffect, useState, MouseEvent, memo } from "react";
import { useTransition, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/Button";

/**
 * A Button element that appears when the vertical offest exceeds 300px.
 *
 * Currently throws strict mode error
 *
 * @returns DOM element that when clicked, will smoothly scroll back to the top of the page.
 */
const ScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const transition = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const scroll = (e: MouseEvent<HTMLElement>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    e.currentTarget.blur();
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return transition(
    (style, item) =>
      item && (
        <animated.div style={style} className="fixed bottom-4 right-4">
          <Button
            onClick={scroll}
            variant="secondary"
            shape="pill"
            className="flex shadow-lg"
          >
            <FontAwesomeIcon icon={["fas", "angle-up"]} size="2x" />
          </Button>
        </animated.div>
      )
  );
});

ScrollToTop.displayName = "ScrollToTop";
export default ScrollToTop;
