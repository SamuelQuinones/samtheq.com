/* eslint-disable jsx-a11y/anchor-has-content */
// TODO: experiment with adding pre ref to children object and targeting the code element
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import NextLink from "next/link";

const Pre: ComponentType<any> = ({ children, ...props }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const icon = useMemo(
    () => (copied ? ["fas", "check"] : ["fas", "copy"]),
    [copied]
  );
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

/** MDX Repalcement Components */
const components = {
  pre: Pre,
  a: Anchor,
  h1: linkify("h1"),
  h2: linkify("h2"),
  h3: linkify("h3"),
  h4: linkify("h4"),
  h5: linkify("h5"),
  h6: linkify("h6"),
};

export default components;
