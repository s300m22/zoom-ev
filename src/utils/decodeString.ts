const decodeString = (string: string) => {
  try {
    return decodeURIComponent(atob(string));
  } catch (error) {
    return '';
  }
};

export default decodeString;
