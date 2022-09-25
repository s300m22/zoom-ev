export const getTimeSeries = (start: Date, end: Date) => {
  const arr: string[] = [];
  const uniqueDays = [start.toDateString()];

  const m = (Math.round(start.getMinutes() / 15) * 15) % 60;
  start.setMinutes(m);

  while (start < end) {
    if (!uniqueDays.includes(start.toDateString())) {
      uniqueDays.push(start.toDateString());
    }
    arr.push(start.toISOString());
    start.setMinutes(start.getMinutes() + 15);
  }

  uniqueDays.forEach((uniqueDay) => {
    const st = new Date(uniqueDay).toISOString();
    const et = new Date(uniqueDay);
    et.setHours(23, 45, 0, 0);

    // if the array includes 12am and 12pm we assume that its a full day
    if (arr.includes(st) && arr.includes(et.toISOString())) {
      arr.push(et.toISOString());
    }
  });

  return arr;
};

export default {};
