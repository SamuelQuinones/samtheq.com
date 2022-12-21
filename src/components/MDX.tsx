// TODO: Figure out how to lazy load
// TODO: Responsive Tabs on small screens

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
import {
  Children,
  useCallback,
  useRef,
  useState,
  type ComponentType,
} from "react";
import NextLink from "next/link";
import NextImage from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import {
  useNavItem,
  Tabs,
  TabPanel as RestartTabPanel,
  Nav,
} from "@restart/ui";
import { makeEventKey } from "@restart/ui/SelectableContext";
import classNames from "classnames";

const Pre: ComponentType<any> = ({ children, ...props }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const icon = copied ? ["fas", "check"] : ["fas", "copy"];
  const copyCode = useCallback(async () => {
    if (!preRef.current) return;
    await navigator.clipboard.writeText(preRef.current.innerText).then(() => {
      setCopied(true);
    });
    setTimeout(() => setCopied(false), 1200);
  }, []);
  return (
    <div data-pre-wrapper="" className="relative">
      <Button
        outline
        variant="secondary"
        onClick={copyCode}
        className="absolute right-2 top-2 w-8 px-2 text-sm leading-4"
      >
        <FontAwesomeIcon height="1em" icon={icon as any} />
      </Button>
      <pre {...props} ref={preRef}>
        {children}
      </pre>
    </div>
  );
};

const Anchor: ComponentType<any> = (props) => {
  if (props.href.startsWith("/")) return <NextLink {...props} />;
  return <a {...props} />;
};

const Img: ComponentType<any> = ({
  useNormal = false,
  hideAlt = false,
  ...props
}) => {
  const Image = useNormal ? "img" : NextImage;
  const showAlt = !!props.alt && !hideAlt;
  return (
    <>
      <Image {...props} />
      {showAlt && <span className="block text-xs">{props.alt}</span>}
    </>
  );
};

const linkify =
  (Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"): ComponentType<any> =>
  ({ children, id, ...props }) => {
    return (
      <Tag {...props} id={id}>
        <a
          href={`#${id}`}
          className="block no-underline after:text-secondary-400 after:opacity-0 after:transition-opacity after:content-['_#'] hocus:after:opacity-100"
        >
          {children}
        </a>
      </Tag>
    );
  };

const CodeTab: ComponentType<any> = ({ eventKey, ...props }) => {
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey),
  });
  return (
    <button
      {...props}
      {...navItemProps}
      className={classNames(
        meta.isActive
          ? "border-t-transparent border-b-white bg-[#071626] text-white"
          : "bg-gray-800 first:border-r peer-first:border-r peer-aria-selected:border-l peer-aria-selected:border-r-0",
        "peer flex items-center border-y border-slate-600 py-1 px-3 font-mono text-xs"
      )}
    />
  );
};
function renderCodeTab(child: any) {
  const { title, eventKey, id } = child.props;
  if (title == null) return null;
  return (
    <CodeTab eventKey={eventKey} id={id}>
      {title}
    </CodeTab>
  );
}
const CodeTabs: ComponentType<any> = ({ children, defaultActiveKey, id }) => {
  return (
    <Tabs defaultActiveKey={defaultActiveKey} id={id}>
      <Nav className="flex rounded-t-lg bg-[#071626] pt-2" role="tablist">
        {Children.map(children, renderCodeTab)}
        <div className="flex flex-auto overflow-hidden">
          <div className="flex flex-auto justify-end border-y border-l border-slate-600 bg-gray-800 pr-4" />
        </div>
      </Nav>
      <div data-tab-container="">
        {Children.map(children, (child) => {
          const childProps = { ...child.props };
          delete childProps.title;
          return <RestartTabPanel {...childProps} />;
        })}
      </div>
    </Tabs>
  );
};
const CodeTabPanel: ComponentType<any> = () => <></>;

/** MDX Repalcement Components */
const components = {
  pre: Pre,
  a: Anchor,
  img: Img,
  h1: linkify("h1"),
  h2: linkify("h2"),
  h3: linkify("h3"),
  h4: linkify("h4"),
  h5: linkify("h5"),
  h6: linkify("h6"),
  CodeTabs,
  CodeTabPanel,
};

export default components;
