import { memo } from "react";
import Link from "next/link";
import FooterIcon from "./Icon";

const Footer = memo(() => {
  const P_CLASSES = "w-full mb-1 flex-shrink-0 text-center md:text-left";
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="bs-container grow-0 border-t border-gray-700 py-3 text-sm">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <section className="my-1 flex flex-wrap items-center justify-center md:my-0 md:justify-start">
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
        <section className="my-1 grid auto-cols-max justify-center text-base md:my-0 md:justify-end max-md:gap-y-2">
          <div className="flex items-center">
            <FooterIcon
              prefix="fab"
              name="youtube"
              url="https://www.youtube.com/channel/UCcAD06PDDZbx-v6QGHUbVfg"
            />
            <FooterIcon
              prefix="fab"
              name="twitter"
              url="https://twitter.com/SamuelQuinones1"
            />
            <FooterIcon
              prefix="fab"
              name="github"
              url="https://github.com/SamuelQuinones"
            />
            <FooterIcon
              prefix="fab"
              name="linkedin-in"
              url="https://www.linkedin.com/in/samuelq/"
              title="linkedin"
            />
          </div>
          <div className="flex items-center justify-center">
            <Link
              href="/links"
              onPointerUp={(e) => (e.target as HTMLElement).blur()}
              onKeyDown={(e) =>
                e.keyCode === 13 && (e.target as HTMLElement).blur()
              }
              className="text-secondary-300 hocus:text-secondary-400 hocus:underline"
            >
              Additional Links
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
});
Footer.displayName = "Footer";
export default Footer;
