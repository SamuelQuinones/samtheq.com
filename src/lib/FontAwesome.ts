//* Core
import {
  config,
  library,
  findIconDefinition,
  type IconLookup,
} from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faTwitter,
  faYoutube,
  faLinkedinIn,
  faTwitch,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faClose as faCloseSolid,
  faGraduationCap,
  faBriefcase,
  faSliders,
  faDownload,
  faGlobe,
  faClockRotateLeft,
  faCopy,
  faCheck,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export const loadIconWithFallback = (
  icon: IconLookup,
  fallback: IconLookup = { iconName: "globe", prefix: "fas" }
) => {
  if (icon.prefix == null || icon.iconName == null) return fallback;
  const iconDefinition = findIconDefinition(icon);
  if (!iconDefinition) return fallback;
  return { iconName: iconDefinition.iconName, prefix: iconDefinition.prefix };
};

/**
 * Function intended to be called outside of any react code, before the NextJS App initializes.
 *
 * This function:
 * - sets {@link config} `autoAddCss` to false
 * - Adds icons to the global library
 */
export const initializeFontAwesome = () => {
  config.autoAddCss = false;
  library.add(
    faDiscord,
    faGithub,
    faTwitter,
    faYoutube,
    faChevronUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faCloseSolid,
    faGraduationCap,
    faBriefcase,
    faSliders,
    faLinkedinIn,
    faDownload,
    faGlobe,
    faTwitch,
    faClockRotateLeft,
    faTiktok,
    faCopy,
    faCheck,
    faCalendarDays,
    faList
  );
};
