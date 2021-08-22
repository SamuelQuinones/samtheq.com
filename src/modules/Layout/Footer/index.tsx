import { FC } from "react";
import { icons } from "./Helper";
import FooterIcon from "./_Icon";

const Footer: FC = () => {
  const P_CLASSES = "w-full mb-1 flex-shrink-0 text-center md:text-left";
  return (
    <div className="bs-container py-3 border-t border-gray-700">
      <footer className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center md:justify-start my-1 md:my-0 flex-wrap">
          <p className={P_CLASSES}>&copy; 2021 SamTheQ</p>
          <p className={P_CLASSES}>Made with Tailwind and NextJS</p>
        </div>
        <div className="flex items-center justify-center md:justify-end my-1 md:my-0">
          {icons.map((icon, idx) => (
            <FooterIcon key={`icon${idx}`} {...icon} />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
