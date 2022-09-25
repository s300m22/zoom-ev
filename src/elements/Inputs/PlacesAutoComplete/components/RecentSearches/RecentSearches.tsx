import { useState, useEffect } from 'react';
import { logError } from '../../../../../utils';
import {
  RecentSearchesWrapper,
  RecentSearchesTitle,
  RecentSearchesItem,
} from './RecentSearches.styled';

interface RecentSearchesProps {
  handleSelect: (description: string) => Promise<void>;
  handleClose: () => void;
}
const RecentSearches = ({ handleSelect, handleClose }: RecentSearchesProps) => {
  const [searchItems, setSearchItems] = useState<string[]>([]);
  useEffect(() => {
    try {
      const items = localStorage.getItem('recentSearches');
      if (typeof items === 'string') {
        setSearchItems(JSON.parse(items));
      }
    } catch (error: any) {
      logError(error);
    }
  }, []);

  return searchItems.length ? (
    <RecentSearchesWrapper>
      <RecentSearchesTitle>Recent searches</RecentSearchesTitle>
      {searchItems.map((searchItem) => (
        <RecentSearchesItem
          key={searchItem}
          onClick={() => {
            handleSelect(searchItem);
            handleClose();
          }}
        >
          {searchItem}
        </RecentSearchesItem>
      ))}
    </RecentSearchesWrapper>
  ) : null;
};

export default RecentSearches;
