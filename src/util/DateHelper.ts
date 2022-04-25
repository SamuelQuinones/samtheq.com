import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

/**
 * @see {@link dayjs.Dayjs.format}
 */
export const format = (
  date?: string | number | Date | dayjs.Dayjs,
  format?: string
) => {
  return dayjs(date).format(format);
};

/**
 * @see {@link dayjs.Dayjs.format}
 */
export const formatUTC = (
  date?: string | number | Date | dayjs.Dayjs,
  format?: string
) => {
  return dayjs.utc(date).format(format);
};

/** Re-export */
export const nextDayJs = dayjs;
