import { MouseEventHandler } from 'react';
import { Button, Heading, SubText } from '../../../../elements';
import { EvCarIcon } from '../../../../icons';
import { ShowEVsButtonWrapper, HeadingWrapper, NoResultsWrapper } from './NoResults.styled';

interface NoResultsProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  findingCars: boolean;
}

const NoResults = ({ handleClick, findingCars }: NoResultsProps) => {
  return (
    <NoResultsWrapper>
      <EvCarIcon />
      <HeadingWrapper>
        <Heading variant="h4">No EVs available</Heading>
        <SubText style={{ fontSize: '16px' }}>
          Try adjusting the filters or changing the dates
        </SubText>
      </HeadingWrapper>
      <ShowEVsButtonWrapper>
        <Button isLoading={findingCars} onClick={handleClick}>
          Show EVs further away
        </Button>
      </ShowEVsButtonWrapper>
    </NoResultsWrapper>
  );
};

export default NoResults;
