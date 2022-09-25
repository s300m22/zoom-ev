import styled from 'styled-components';
import { Container } from '../../elements';

export const GoBackWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
`;

export const BookEvWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  align-items: flex-start;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const BookEvContainer = styled(Container)`
  padding-bottom: 130px;
`;
