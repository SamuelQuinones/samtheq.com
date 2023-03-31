export const themeConfig = new Map([
  [
    "work",
    {
      contentClassName: "bg-primary-600",
      arrowClassName:
        "group-even:border-r-primary-600 group-odd:md:border-l-primary-600 group-odd:max-md:border-r-primary-600",
      icon: "briefcase" as const,
    },
  ],
  [
    "education",
    {
      contentClassName: "bg-info-700",
      arrowClassName:
        "group-even:border-r-info-700 group-odd:md:border-l-info-700 group-odd:max-md:border-r-info-700",
      icon: "graduation-cap" as const,
    },
  ],
]);

export const getTheme = (key: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (themeConfig.has(key)) return themeConfig.get(key)!;
  return {
    contentClassName: "bg-black",
    arrowClassName:
      "group-even:border-r-black group-odd:md:border-l-black group-odd:max-md:border-r-black",
    icon: "globe" as const,
  };
};
