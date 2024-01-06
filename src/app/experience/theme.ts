import { faBriefcase, faGlobe, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export const themeConfig = new Map([
  [
    "work",
    {
      contentClassName: "bg-rose-600",
      arrowClassName:
        "group-even:border-r-rose-600 group-odd:md:border-l-rose-600 group-odd:max-md:border-r-rose-600",
      icon: faBriefcase,
    },
  ],
  [
    "education",
    {
      contentClassName: "bg-cyan-700",
      arrowClassName:
        "group-even:border-r-cyan-700 group-odd:md:border-l-cyan-700 group-odd:max-md:border-r-cyan-700",
      icon: faGraduationCap,
    },
  ],
]);

export const getTheme = (key: string) => {
  if (themeConfig.has(key)) return themeConfig.get(key)!;
  return {
    contentClassName: "bg-black",
    arrowClassName:
      "group-even:border-r-black group-odd:md:border-l-black group-odd:max-md:border-r-black",
    icon: faGlobe,
  };
};
