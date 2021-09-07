//* Core
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

export const initializeFontAwesome = () => {
  config.autoAddCss = false;
  library.add(faDiscord, faGithub, faTwitter, faYoutube, faAngleUp);
};
