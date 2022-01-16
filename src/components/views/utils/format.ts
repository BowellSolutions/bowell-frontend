/**
 * @author: Adam Lisichin
 * @file: Exports functions used for formatting data, calculations, etc.
 */

/**
 * Formats date or string data to locale string
 */
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleString();
};

/**
 * Returns number of days between two dates.
 * Output can be both positive and negative.
 */
export const getDaysBetweenDates = (date1: Date, date2: Date) => {
  const diff = date1.getTime() - date2.getTime();
  return diff / (1000 * 60 * 60 * 24);
};
