import useMediaQuery from "./use-media-query";

export default function useBreakpoints() {
  const isSmall = useMediaQuery("not all and (min-width: 640px)");
  const isMedium = useMediaQuery("not all and (min-width: 768px)");
  const isLarge = useMediaQuery("not all and (min-width: 1024px)");
  const isExtraLarge = useMediaQuery("not all and (min-width: 1280px)");
  const isDoubleExtraLarge = useMediaQuery("not all and (min-width: 1536px)");
  const isExtraSmall = !isSmall && !isMedium && !isLarge && !isExtraLarge && !isDoubleExtraLarge;

  return { isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge, isDoubleExtraLarge };
}
