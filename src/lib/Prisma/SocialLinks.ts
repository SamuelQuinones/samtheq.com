import type { SocialLink } from "@prisma/client";

export type TLinks = {
  lastUpdated: string;
  socialLinks: Array<
    Pick<SocialLink, "ID" | "description" | "target" | "title" | "redirect"> & {
      icon_prefix: string | null;
      icon_name: string | null;
    }
  >;
};

export type TLinkRedirectProps = Pick<
  SocialLink,
  "title" | "description" | "target" | "redirect"
>;
