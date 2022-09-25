const convertToTimestamp = (date: string | Date) => {
  if (date instanceof Date) {
    const selectedDate = new Date(date);
    return Date.parse(selectedDate.toISOString());
  }
  const [d, m, y] = date.split('/');
  return Date.parse(`${m}/${d}/${y}`);
};

export default convertToTimestamp;
