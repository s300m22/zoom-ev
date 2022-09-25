import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { StepWrapper, StepRow } from '../StepsShared.styled';
import { Button, Heading, List, SimpleCard } from '../../../../elements';
import VinTooltip from '../../../../elements/VinTooltip';

interface IntroProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  isBusiness: boolean;
}

const IntroWrapper = styled(StepWrapper)`
  li {
    font-size: 16px;
    margin: 10px 20px 10px 34px;
  }

  button {
    margin-top: 10px;
  }
`;

const VinItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Intro = ({ setActiveStep, isBusiness }: IntroProps) => {
  return (
    <IntroWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">You will need: </Heading>
          <List
            listColumns={1}
            listItems={
              isBusiness
                ? [
                    'Registration plate number',
                    // eslint-disable-next-line react/jsx-key, react/jsx-indent
                    <VinItemContainer>
                      <p>VIN number (on your windscreen)</p>
                      <VinTooltip />
                    </VinItemContainer>,
                    'Pictures of your EV',
                  ]
                : ['Registration plate number', 'Pictures of your EV']
            }
          />
          <Button onClick={() => setActiveStep(1)} withArrow>
            Get started
          </Button>
        </SimpleCard>
      </StepRow>
    </IntroWrapper>
  );
};
export default Intro;
