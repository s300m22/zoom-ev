/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntryCollection } from 'contentful';

const removeEntryCollectionCircularReferences = <T>(
  entries: EntryCollection<T>,
  isBlogPost?: boolean,
): EntryCollection<T> => {
  const recursiveRemoveKey = (object: EntryCollection<T>, deleteKey: string) => {
    // eslint-disable-next-line no-param-reassign
    delete (object as any)[deleteKey];

    Object.values(object).forEach((val) => {
      if (typeof val !== 'object') return;

      recursiveRemoveKey(val, deleteKey);
    });
  };
  const newEntries = JSON.parse(entries.stringifySafe()) as typeof entries;
  if (!isBlogPost) {
    recursiveRemoveKey(newEntries, 'recommendedOtherPosts');
  }
  return newEntries;
};

export default removeEntryCollectionCircularReferences;
