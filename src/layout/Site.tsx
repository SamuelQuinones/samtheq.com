import { FC, memo, MouseEventHandler, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "src/navigation/NavBar";
import NavLink from "src/navigation/NavLink";
import Button from "@components/Button";

/** A Button element that appears when the vertical offest exceeds 300px.*/
const ScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const scroll: MouseEventHandler<HTMLButtonElement> = (e) => {
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

const SiteLayout: FC = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavLink href="/">Home</NavLink>
      </Navbar>
      {children}
      <ScrollToTop />
    </>
  );
};

export default SiteLayout;
