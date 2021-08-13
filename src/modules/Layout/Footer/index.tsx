import { FC } from "react";
import { icons } from "./Helper";
import FooterIcon from "./_Icon";

const Footer: FC = () => {
  return (
    <>
      <main className="flex-auto" />
      <div className="bs-container py-4 border-t border-gray-700">
        <footer className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center md:justify-start my-1 md:my-0">
            &copy; 2021 SamTheQ
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
