import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export type FooterIconProps = {
  prefix: IconPrefix;
  name: IconName;
  url?: string;
};

export const icons: Array<FooterIconProps> = [
  { prefix: "fab", name: "youtube", url: "http://corporalsaturn.com" },
  {
    prefix: "fab",
    name: "twitter",
    url: "https://twitter.com/SamuelQuinones1",
  },
  { prefix: "fab", name: "github", url: "https://github.com/SamuelQuinones" },
];
