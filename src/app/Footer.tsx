import Tooltip from "@/components/Tooltip";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface FooterIconProps {
  icon: IconDefinition;
  title: string;
  url: string;
}

function FooterIcon({ icon, title, url }: FooterIconProps) {
  return (
    <Tooltip tooltipText={title} placement="top">
      <a
        href={url}
        className="mx-2 text-white transition-colors duration-200 active:text-secondary-300 hocus:text-secondary-300"
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon style={{ height: "24px" }} icon={icon} height="1em" />
      </a>
    </Tooltip>
  );
}

export default function Footer() {
  const P_CLASSES = "w-full mb-1 flex-shrink-0 text-center md:text-left";
  const CURRENT_YEAR = new Date().getFullYear();
  return (
    <footer className="bs-container grow-0 border-t border-gray-700 py-3 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <section className="my-1 flex flex-wrap items-center justify-center md:my-0 md:justify-center">
          <p className={P_CLASSES}>&copy; {CURRENT_YEAR} SamTheQ</p>
          <p className={P_CLASSES}>Made with Tailwind and NextJS</p>
          <p className={P_CLASSES}>
            Favicon &amp; Logo made by{" "}
            <a
              href="https://twitter.com/untamabletablez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-300 hocus:text-secondary-400 hocus:underline"
            >
              UntamableTablez
            </a>
          </p>
        </section>
        <section className="my-1 grid auto-cols-max justify-center text-base max-md:gap-y-2 md:my-0 md:justify-end">
          <div className="flex items-center">
            <FooterIcon icon={faYoutube} title="Youtube" url="https://www.youtube.com/@sammy_q" />
            <FooterIcon
              icon={faTwitter}
              title="Twitter"
              url="https://twitter.com/SamuelQuinones1"
            />
            <FooterIcon icon={faGithub} title="Github" url="https://github.com/SamuelQuinones" />
            <FooterIcon
              icon={faLinkedinIn}
              url="https://www.linkedin.com/in/samuelq/"
              title="linkedin"
            />
          </div>
          <div className="flex items-center justify-center">
            <Link
              href="/links"
              className="text-secondary-300 hocus:text-secondary-400 hocus:underline"
            >
              Additional Links
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
}
