const convertToDatabaseDateFormat = (date: string | Date): string => {
  if (date instanceof Date) {
    const offset = date.getTimezoneOffset();
    const selectedDate = new Date(date.getTime() - offset * 60 * 1000);
    return selectedDate.toISOString().split('T')[0];
  }
  const [d, m, y] = date.split('/');
  return `${y}/${m}/${d}`;
};

export default convertToDatabaseDateFormat;
