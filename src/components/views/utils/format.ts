export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleString();
}

export const getDaysBetweenDates = (date1: Date, date2: Date) => {
  const diff = date1.getTime() - date2.getTime();
  return diff / (1000 * 60 * 60 * 24);
}
