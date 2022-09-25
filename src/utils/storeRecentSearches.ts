import logError from './logError';

const storeRecentSearches = (search: string) => {
  try {
    const recentSearches =
      typeof localStorage.getItem('recentSearches') === 'string'
        ? JSON.parse(localStorage.getItem('recentSearches') as string)
        : [];
    const filteredSearchesArray = recentSearches
      .filter((element: string) => element !== search)
      .slice(0, 4);
    localStorage.setItem('recentSearches', JSON.stringify([search, ...filteredSearchesArray]));
  } catch (error) {
    logError(error);
  }
};

export default storeRecentSearches;
