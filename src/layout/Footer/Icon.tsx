import { memo } from "react";
import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@components/Tooltip";

type FooterIconProps = {
  prefix: IconPrefix;
  name: IconName;
  title?: string;
  url: string;
};

const FooterIcon = memo<FooterIconProps>(
  ({ name, prefix, url, title = name }) => {
    return (
      <Tooltip tooltipText={title} placement="top">
        <a
          href={url}
          className="mx-2 text-white transition-colors duration-200 active:text-secondary-300 hocus:text-secondary-300"
          title={title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            style={{ height: "24px" }}
            icon={[prefix, name]}
            height="1em"
          />
        </a>
      </Tooltip>
    );
  }
);
FooterIcon.displayName = "FooterIcon";
export default FooterIcon;
