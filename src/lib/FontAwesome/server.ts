/* eslint-disable @typescript-eslint/no-var-requires */
import { faGithub, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
const { library, config } = require("@fortawesome/fontawesome-svg-core");

/**
 * April 1st 2023
 * Because NextJS wants to not load icons cross-env, we have to load some icons on the server and some on the client ... love that
 *
 * LOOKS LIKE AUTOADDCSS MIGHT NOT BE NEEDED ON SERVER.
 */
export default function addServerIcons() {
  config.autoAddCss = false;
  library.add(faYoutube, faGithub, faLinkedinIn, faTwitter);
}
