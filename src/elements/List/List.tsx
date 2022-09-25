/* eslint-disable react/no-array-index-key */
import { ReactNode } from 'react';
import { ListContainer, ListItem, ListWrapper } from './List.styled';
import Heading from '../Heading';

export interface ListProps {
  listTitle?: string;
  listItems?: Array<string | ReactNode>;
  listColumns: number;
  margin?: string;
}

const List = ({ listTitle, listItems, listColumns, margin = '20px 20px 20px 34px' }: ListProps) => (
  <ListWrapper>
    {listTitle && <Heading variant="h5">{listTitle}</Heading>}
    <ListContainer listColumns={listColumns}>
      {listItems?.map((item, i) => (
        <ListItem key={i} style={{ margin }}>
          {item}
        </ListItem>
      ))}
    </ListContainer>
  </ListWrapper>
);

export default List;
