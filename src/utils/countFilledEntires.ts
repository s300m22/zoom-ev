const countFilledEntries = (
  object: Record<string, unknown> | null | undefined,
  restrictedKeys?: Array<string>,
) => {
  if (object) {
    if (restrictedKeys) {
      const filterObject = Object.entries(object).filter(
        ([key, value]) => !restrictedKeys.includes(key) && value !== null,
      );
      return filterObject.length;
    }
    return Object.values(object).filter((value) => value !== null).length;
  }
  return 0;
};

export default countFilledEntries;
