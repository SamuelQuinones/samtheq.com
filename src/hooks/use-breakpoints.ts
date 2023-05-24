import useMediaQuery from "./use-media-query";

export default function useBreakpoints() {
  const isSmall = useMediaQuery("(min-width: 640px) and (max-width: 767px)");
  const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLarge = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px) and (max-width: 1535px)");
  const isDoubleExtraLarge = useMediaQuery("(min-width: 1536px)");
  const isExtraSmall = !isSmall && !isMedium && !isLarge && !isExtraLarge && !isDoubleExtraLarge;

  return { isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge, isDoubleExtraLarge };
}
