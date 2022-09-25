import styled from 'styled-components';
import { PrimaryContentWrapper } from '../../ColumnSectionLayout/ColumnSectionLayout.styled';

interface WrapperProps {
  margin: string;
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: ${({ margin }) => margin};
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
  padding-top: 5vmax;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-bottom: 0;
  }
`;

export const RowContainer = styled.div`
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 75px 0;
  }
`;

export const CardsContainer = styled.div`
  ${RowContainer} {
    &:nth-child(2n) {
      ${PrimaryContentWrapper} {
        > div:first-child {
          order: 1;
          ${({ theme }) => theme.up(theme.breakpoints.md)} {
            order: 0;
          }
        }
      }
    }
  }
`;
