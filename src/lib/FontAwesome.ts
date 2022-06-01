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
} from "@fortawesome/free-brands-svg-icons";
import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faClose as faCloseSolid,
  faGraduationCap,
  faBriefcase,
  faSliders,
  faDownload,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

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
    faChevronRight,
    faCloseSolid,
    faGraduationCap,
    faBriefcase,
    faSliders,
    faLinkedinIn,
    faDownload,
    faGlobe,
    faTwitch
  );
};
