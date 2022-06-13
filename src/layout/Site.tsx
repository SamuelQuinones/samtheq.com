import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { DefaultSeo } from "next-seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, m } from "framer-motion";
import { useEventListener } from "@hooks";
import Navbar from "@components/Navigation/NavBar";
import NavLink from "@components/Navigation/NavLink";
import Footer from "./Footer";
import Button from "@components/Button";
import SEO from "@util/SeoConfig";
import DropLink from "@components/Navigation/DropLink";
import DropmenuItem from "@components/DropMenu/Item";

/** A Button element that appears when the vertical offest exceeds 300px.*/
const ScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const scroll: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    e.currentTarget.blur();
  }, []);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEventListener("window", "scroll", toggleVisibility);

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {isVisible && (
        <m.div
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
            className="flex px-2 shadow-lg"
            aria-label="Scroll to the Top of the Page"
          >
            <FontAwesomeIcon
              height="1em"
              icon={["fas", "chevron-up"]}
              size="2x"
            />
          </Button>
        </m.div>
      )}
    </AnimatePresence>
  );
});
ScrollToTop.displayName = "ScrollToTop";

const SiteLayout: FC = ({ children }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Navbar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/experience">Experience</NavLink>
        <NavLink href="/blog" matchNestedPaths>
          Blog
        </NavLink>
        <DropLink id="content-drop-down" label="Projects">
          <DropmenuItem className="nav-link w-full hocus:!bg-transparent hocus:!text-opacity-80">
            Coming Soon...
          </DropmenuItem>
        </DropLink>
      </Navbar>
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default SiteLayout;
