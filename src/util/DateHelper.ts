import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

/**
 * @see {@link dayjs.Dayjs.format}
 */
export const format = (
  date?: string | number | Date | dayjs.Dayjs | null,
  format?: string
) => {
  return dayjs(date).format(format);
};

/**
 * @see {@link dayjs.Dayjs.format}
 */
export const formatUTC = (
  date?: string | number | Date | dayjs.Dayjs | null,
  format?: string
) => {
  return dayjs.utc(date).format(format);
};

/**
 * @see {@link dayjs.Dayjs.isBefore}
 *
 * @param dateToCheck argument to be passed into `isBefore()`
 * @param initialDate argument passed into the initial `dayjs` constructor
 * @param unit unit argument for `isBefore`
 *
 * @example
 * // same as dayjs(new Date()).isBefore("2020-01-01")
 * const example = isBefore("2020-01-01", new Date())
 */
export const isBefore = (
  dateToCheck: string | number | Date | dayjs.Dayjs | null,
  initialDate?: string | number | Date | dayjs.Dayjs | null,
  unit?: dayjs.OpUnitType
) => {
  return dayjs(initialDate).isBefore(dateToCheck, unit);
};

/**
 * @see {@link dayjs.Dayjs.isAfter}
 *
 * @param dateToCheck argument to be passed into `isAfter()`
 * @param initialDate argument passed into the initial `dayjs` constructor
 * @param unit unit argument for `isAfter`
 *
 * @example
 * // same as dayjs(new Date()).isAfter("2020-01-01")
 * const example = isAfter("2020-01-01", new Date())
 */
export const isAfter = (
  dateToCheck: string | number | Date | dayjs.Dayjs | null,
  initialDate?: string | number | Date | dayjs.Dayjs | null,
  unit?: dayjs.OpUnitType
) => {
  return dayjs(initialDate).isAfter(dateToCheck, unit);
};

/** Re-export */
export const nextDayJs = dayjs;
