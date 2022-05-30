import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import type { SocialLink } from "@prisma/client";

export type TLinks = {
  lastUpdated: string;
  socialLinks: Array<
    Pick<SocialLink, "ID" | "description" | "target" | "title" | "redirect"> & {
      icon_prefix: IconPrefix;
      icon_name: IconName;
    }
  >;
};

export type TLinkRedirectProps = Pick<
  SocialLink,
  "title" | "description" | "target" | "redirect"
>;
