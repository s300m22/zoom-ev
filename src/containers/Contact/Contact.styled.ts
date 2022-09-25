import styled from 'styled-components';
import { Container, InputContainer } from '../../elements';
import { StyledButton } from '../../elements/Button/Button.styled';

export const ContactContainer = styled(Container)(
  ({ theme: { down, breakpoints } }) => `
    padding: 160px 0;

    ${down(breakpoints.md)} {
      padding: 40px 0;
    }

    ${StyledButton} {
      margin-top: 17px;
    }
  `,
);

export const Title = styled.div(
  ({ theme: { down, breakpoints } }) => `
  margin-bottom: 90px;

  ${down(breakpoints.md)} {
    margin-bottom: 25px;
  }
`,
);

export const BaseInfoContainer = styled.div(
  ({ theme: { down, breakpoints } }) => `
  flex-direction: column;
  display: flex;

  ${InputContainer} {
    width: 352px;
    margin-bottom: 10px;
    margin-right: 30px;
    ${down(breakpoints.md)} {
       width: 100%;
       margin-right: 0;
    }
  }
`,
);

export const BaseInfoCommunicatorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TopicTitle = styled.h3(
  ({ theme: { down, breakpoints, palette } }) => `
    font-weight: 700;
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: 30px;
    line-height: 120%;
    display: flex;
    margin-bottom: 30px;

    ${down(breakpoints.md)} {
      font-size: 24px;
    }

    :after {
      content: '*';
      color: ${palette.error};
      font-weight: bold;
      font-size: 30px;
      line-height: 120%;

      ${down(breakpoints.md)} {
        font-size: 24px;
      }
    }
  `,
);

export const TopicsContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
`;

export const SuccessView = styled.div(
  ({ theme: { down, breakpoints, palette } }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 175px 0 15%;
    color: : ${palette.primary};
    ${down(breakpoints.md)} {
      margin: 40px 0;
    }
`,
);

export const SuccessViewContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 544px;
  text-align: center;
`;

export const SuccessViewDescription = styled.p`
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const SuccessViewTitle = styled.h1(
  ({ theme: { down, breakpoints } }) => `
    font-weight: 700;
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: 60px;
    line-height: 120%;
    ${down(breakpoints.md)} {
      font-size: 40px;
      max-width: 300px;
    }
  `,
);
