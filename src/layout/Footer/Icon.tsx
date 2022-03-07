import { forwardRef } from "react";
import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FooterIconProps = {
  prefix: IconPrefix;
  name: IconName;
  url?: string;
};

const FooterIcon = forwardRef<HTMLElement, FooterIconProps>(
  ({ name, prefix, url }, ref) => {
    if (url) {
      return (
        <a
          href={url}
          className="flex text-white transition-colors duration-200 hover:text-gray-300 focus:text-gray-300 active:text-gray-300"
          title={name}
          target="_blank"
          rel="noopener noreferrer"
          //@ts-ignore purposely generic
          ref={ref}
        >
          <FontAwesomeIcon
            style={{ height: "auto", width: "auto" }}
            className="mx-2"
            height="24"
            icon={[prefix, name]}
          />
        </a>
      );
    }
    return (
      //@ts-ignore purposely generic
      <div title={name} className="flex" ref={ref}>
        <FontAwesomeIcon
          style={{ height: "auto", width: "auto" }}
          className="mx-2"
          height="24"
          icon={[prefix, name]}
        />
      </div>
    );
  }
);
FooterIcon.displayName = "FooterIcon";
export default FooterIcon;
