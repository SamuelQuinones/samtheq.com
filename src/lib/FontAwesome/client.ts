/* eslint-disable @typescript-eslint/no-var-requires */
import {
  faGithub,
  faLinkedinIn,
  faTiktok,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBriefcase,
  faClockRotateLeft,
  faClose,
  faDownload,
  faGlobe,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { library, config } from "@fortawesome/fontawesome-svg-core";

/**
 * March 30th 2023
 * Because NextJS wants to not load icons cross-env, we have to load some icons on the server and some on the client ... love that
 *
 * the autoAddCss is meant to be called client side I guess? Which does make sense...
 */
export default function addClientIcons() {
  config.autoAddCss = false;
  library.add(
    faClockRotateLeft,
    faDownload,
    faGraduationCap,
    faGlobe,
    faBriefcase,
    faClose,
    faYoutube,
    faTiktok,
    faTwitter,
    faLinkedinIn,
    faTwitch,
    faGithub
  );
}
