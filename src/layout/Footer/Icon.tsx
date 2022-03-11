import { memo } from "react";
import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@components/Tooltip";

type FooterIconProps = {
  prefix: IconPrefix;
  name: IconName;
  url?: string;
};

const FooterIcon = memo<FooterIconProps>(({ name, prefix, url }) => {
  if (url) {
    return (
      <Tooltip tooltipText={name} placement="top">
        <a
          href={url}
          className="flex text-white transition-colors duration-200 hover:text-gray-300 focus:text-gray-300 active:text-gray-300"
          title={name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            style={{ height: "auto", width: "auto" }}
            className="mx-2"
            height="24"
            icon={[prefix, name]}
          />
        </a>
      </Tooltip>
    );
  }
  return (
    <Tooltip tooltipText={name} placement="top">
      <div title={name} className="flex">
        <FontAwesomeIcon
          style={{ height: "auto", width: "auto" }}
          className="mx-2"
          height="24"
          icon={[prefix, name]}
        />
      </div>
    </Tooltip>
  );
});
FooterIcon.displayName = "FooterIcon";
export default FooterIcon;
