import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useWindowSize } from "@hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { qs } from "@util/DomHelper";
import Button from "@components/Button";
import Drawer from "@components/Drawer";
import Tooltip from "@components/Tooltip";

type TocItem = { textContent: string; level: number; id: string };

type Props = {
  toc: Array<TocItem>;
};

const TableOfContents = ({ toc }: Props) => {
  const [tocOpen, setTocOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const focusMe = useRef("");
  const { width } = useWindowSize();
  const drawerMode = useMemo(() => width < 1536, [width]);

  useEffect(() => {
    if (!drawerMode) {
      setTocOpen(false);
      focusMe.current = "";
    }
  }, [drawerMode]);

  const handleFocusDataHeading = useCallback((id: string) => {
    qs(document, `[data-heading="${id}"] > a`)?.focus();
  }, []);

  const handleDrawerItemClick = useCallback((id: string) => {
    focusMe.current = id;
    setTocOpen(false);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setTocOpen(true);
    focusMe.current = "";
  }, []);

  const handleExitComplete = useCallback(() => {
    if (focusMe.current !== "") {
      setTimeout(() => handleFocusDataHeading(focusMe.current), 100);
    } else {
      setTimeout(() => btnRef.current?.focus(), 100);
    }
  }, [handleFocusDataHeading]);

  const sideTOC = useMemo(() => {
    return toc.map(({ level, textContent, id }) => {
      const onClick = () => {
        setTimeout(() => handleFocusDataHeading(id), 100);
      };
      const classList = classNames(
        "text-sm",
        "transition-colors",
        "text-white hocus:text-gray-400",
        "px-2",
        {
          "pl-4": level === 3,
          "pl-6": level === 4,
          "pl-8": level === 5,
        }
      );
      return (
        <li key={id}>
          <a href={`#${id}`} className={classList} onClick={onClick}>
            {textContent}
          </a>
        </li>
      );
    });
  }, [handleFocusDataHeading, toc]);

  const drawerTOC = useMemo(() => {
    return toc.map(({ id, level, textContent }) => {
      const classList = classNames(
        "text-lg",
        "transition-colors",
        "text-white hocus:text-gray-400",
        "px-2",
        {
          "pl-4": level === 3,
          "pl-6": level === 4,
          "pl-8": level === 5,
        }
      );
      return (
        <li key={id}>
          <a
            href={`#${id}`}
            className={classList}
            onClick={() => handleDrawerItemClick(id)}
          >
            {textContent}
          </a>
        </li>
      );
    });
  }, [handleDrawerItemClick, toc]);

  return (
    <>
      <aside className="z-20 2xl:hidden">
        <Tooltip tooltipText="Open Table of Contents" placement="left">
          <Button
            onClick={handleOpenDrawer}
            ref={btnRef}
            className="fixed top-20 right-4 flex items-center lg:right-8"
          >
            <FontAwesomeIcon
              className="text-2xl lg:mr-2 lg:text-base lg:leading-4"
              height="1em"
              icon={["fas", "list"]}
            />
            <span className="lg:hidden">
              <span className="sr-only">
                <em>Open Table of contents</em>
              </span>
            </span>
            <span className="hidden lg:inline xl:hidden">
              T.O.C.
              <span className="sr-only">
                <em>Open Table of contents</em>
              </span>
            </span>
            <span className="hidden xl:inline">Table of Contents</span>
          </Button>
        </Tooltip>
        <Drawer
          position="right"
          open={tocOpen}
          handleClose={() => setTocOpen(false)}
          restoreFocus={false}
          onExitComplete={handleExitComplete}
          header={
            <h2 className="text-center text-lg font-bold">Table of Contents</h2>
          }
          footer={
            <>
              <Button
                onClick={() => setTocOpen(false)}
                className="w-full"
                variant="info"
              >
                Return to Blog Post
              </Button>
            </>
          }
          footerClassName="p-2"
        >
          <ol className="space-y-2">{drawerTOC}</ol>
        </Drawer>
      </aside>
      <aside className="z-20 hidden w-full lg:max-w-xs 2xl:block">
        <nav
          style={{ width: "inherit", maxWidth: "inherit" }}
          className="fixed top-16 right-0 pt-4"
        >
          <h2 className="mb-3 w-full px-4 text-sm font-semibold underline underline-offset-4">
            Table of Contents
          </h2>
          <div className="h-full max-h-[calc(100vh-100px-4rem-4rem)] overflow-y-auto pl-4">
            <ol className="space-y-2">{sideTOC}</ol>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default TableOfContents;