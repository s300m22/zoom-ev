import format from 'date-fns/format';

interface ConvertToReadableDateFormatProps {
  date: string | number | Date | null | undefined;
  mutable?: boolean;
  showTime?: boolean;
  withWords?: boolean;
  withDays?: boolean;
  onlyTime?: boolean;
}

const convertToReadableDateFormat = ({
  date,
  mutable,
  showTime,
  withWords = false,
  withDays = false,
  onlyTime = false,
}: ConvertToReadableDateFormatProps) => {
  // Check if date is already correctly formated
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (typeof date === 'string' && date.match(dateRegex)) {
    return date;
  }

  if (mutable && typeof date === 'string') {
    const [y, m, d] = date.split('/');
    return `${d}/${m}/${y}`;
  }

  if (typeof date === 'number' || date instanceof Date || typeof date === 'string') {
    const newDate = new Date(date);
    if (withDays) {
      return format(newDate, 'ccc, MMM d yyyy');
    }
    if (onlyTime) {
      return format(newDate, 'h:mm a');
    }
    if (withWords) {
      return format(newDate, 'LLL d yyyy, h:mm a');
    }
    return showTime ? newDate.toLocaleString('en-GB') : format(newDate, 'dd.MM.yyyy');
  }

  return undefined;
};

export default convertToReadableDateFormat;
