const encodeString = (string: string) => {
  try {
    return btoa(encodeURIComponent(string));
  } catch (error) {
    return '';
  }
};

export default encodeString;
