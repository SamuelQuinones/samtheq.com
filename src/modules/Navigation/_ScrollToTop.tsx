//TODO: Look into switching the span tags with an svg parent and path children a-la https://codesandbox.io/s/framer-motion-side-menu-mx2rw?from-embed=&file=/src/MenuToggle.tsx

import { useEffect, useState, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/Button";

/** A Button element that appears when the vertical offest exceeds 300px.*/
const ScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.setAttribute("tabIndex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabIndex");
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

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Button
            onClick={scroll}
            variant="secondary"
            shape="pill"
            className="flex shadow-lg"
          >
            <FontAwesomeIcon icon={["fas", "angle-up"]} size="2x" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ScrollToTop.displayName = "ScrollToTop";
export default ScrollToTop;
