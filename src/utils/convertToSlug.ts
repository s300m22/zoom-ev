const convertToSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

export default convertToSlug;
