import { FC, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FooterIconProps } from "./Helper";

const FooterIcon: FC<FooterIconProps> = memo(({ name, prefix, url }) => {
  return url ? (
    <a
      href={url}
      className="flex text-white active:text-gray-300 focus:text-gray-300 hover:text-gray-300 transition-colors duration-200"
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
  ) : (
    <div title={name} className="flex">
      <FontAwesomeIcon
        style={{ height: "auto", width: "auto" }}
        className="mx-2"
        height="24"
        icon={[prefix, name]}
      />
    </div>
  );
});

FooterIcon.displayName = "FooterIcon";
export default FooterIcon;
