import styled from 'styled-components';
import { Container } from '../../../elements';
import { Link, LinkWrapper } from '../../../elements/StyledLink/StyledLink.styled';
import { TabsSection } from '../../SectionLayouts/TabSectionLayout/TabSectionLayout.styled';

export const Wrapper = styled(Container)(
  ({ theme: { breakpoints, up } }) => `
    margin-bottom: 30px;

    ${up(breakpoints.md)} {
      margin-bottom: 130px;
    }

    ${TabsSection} {
      padding: 50px 0 0;
    }
  `,
);

export const QuestionPageWrapper = styled.div(
  ({ theme: { breakpoints, up, palette } }) => `
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 30px;

    ${up(breakpoints.md)} {
      flex-wrap: nowrap;
      justify-content: space-between;
      margin-top: 90px;
    }

    ${LinkWrapper} {
      display: inline;
      margin-bottom: 25px;
      text-transform: capitalize;

      a {
        color: ${palette.hover};
        font-weight: 700;
      }
    }
  `,
);

export const QuestionWrapper = styled.div(
  ({ theme: { breakpoints, up } }) => `
    display: flex;
    flex-width: 100%;
    flex-direction: column;

    ${up(breakpoints.md)} {
      flex-basis: 65.715%;
    }
  `,
);

export const OtherArticlesWrapper = styled.div(
  ({ theme: { breakpoints, up } }) => `
    display: flex;
    flex-basis: 100%;

    ${up(breakpoints.md)} {
      flex-basis: 31.43%;
    }
  `,
);

export const AnswerWraper = styled.div(
  ({ theme: { breakpoints, up } }) => `
    margin: 34px 0 0;

    ${up(breakpoints.md)} {
      margin: 34px 0;
    }
  `,
);

export const OtherArticles = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  margin-bottom: 32px;
`;

export const FaqLink = styled(Link)`
  padding: 19px 30px 19px 33px;
  display: block;
  margin: 0 -30px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.lightText};

  &:last-of-type {
    border-bottom: none;
    padding: 19px 30px 0 33px;
  }

  &:first-of-type {
    margin-top: 20px;
  }

  svg {
    margin-right: 20px;
  }
`;
