import { FC, memo, MouseEventHandler, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEventListener } from "@hooks";
import Navbar from "src/navigation/NavBar";
import NavLink from "src/navigation/NavLink";
import Footer from "./Footer";
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

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEventListener("window", "scroll", toggleVisibility);

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
            <FontAwesomeIcon icon={["fas", "chevron-up"]} size="2x" />
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
        <NavLink href="/experience">Experience</NavLink>
      </Navbar>
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default SiteLayout;
