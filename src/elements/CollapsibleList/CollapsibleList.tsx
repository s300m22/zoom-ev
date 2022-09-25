import { ReactNode } from 'react';
import Collapsible from 'react-collapsible';
import { ArrowBottomIcon } from '../../icons';
import { CollapsibleListWrapper, TriggerWrapper } from './CollapsibleList.styled';

interface Element {
  title: string;
  content: ReactNode;
}

interface TriggerProps {
  title: string;
}
export interface CollapsibleListProps {
  elementsList: Array<Element | null>;
}

const Trigger = ({ title }: TriggerProps) => (
  <TriggerWrapper>
    {title}
    <ArrowBottomIcon />
  </TriggerWrapper>
);
const CollapsibleList = ({ elementsList }: CollapsibleListProps) => {
  return (
    <CollapsibleListWrapper>
      {elementsList.map((element) =>
        element ? (
          <Collapsible key={element.title} trigger={<Trigger title={element.title} />}>
            {element.content}
          </Collapsible>
        ) : null,
      )}
    </CollapsibleListWrapper>
  );
};

export default CollapsibleList;
