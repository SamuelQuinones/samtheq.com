// TODO: require is temporary, until fontawesome fixes hydration issues
/* eslint-disable @typescript-eslint/no-var-requires */
//* Core
const { config, library } = require("@fortawesome/fontawesome-svg-core");
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
import {
  faCalendarDays,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";

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
    faList,
    faEnvelope
  );
};
