/* eslint-disable @typescript-eslint/no-var-requires */
import { faGithub, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
const { library } = require("@fortawesome/fontawesome-svg-core");

/**
 * MArch 30th 2023
 * Because NextJS wants to not load icons cross-env, we have to load some icons on the server and some on the client ... love that
 *
 * LOOKS LIKE AUTOADDCSS MIGHT NOT BE NEEDED ON SERVER. BE ON THE LOOKOUT DOR DUPLICATE STYLES IN A STYLE TAG
 */
export default function addServerIcons() {
  library.add(faYoutube, faGithub, faLinkedinIn, faTwitter);
}
