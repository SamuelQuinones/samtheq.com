import { FC } from "react";
import { icons } from "./Helper";
import FooterIcon from "./_Icon";

const Footer: FC = () => {
  return (
    <>
      <main className="flex-auto" />
      <div className="bs-container py-3 border-t border-gray-700">
        <footer className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center flex-col md:justify-start my-1 md:my-0">
            <p className="w-full mb-1">&copy; 2021 SamTheQ</p>
            <p className="w-full mb-1">Made with Tailwind and NextJS</p>
          </div>
          <div className="flex items-center justify-center md:justify-end my-1 md:my-0">
            {icons.map((icon, idx) => (
              <FooterIcon key={`icon${idx}`} {...icon} />
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
