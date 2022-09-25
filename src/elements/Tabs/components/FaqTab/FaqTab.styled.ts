import styled from 'styled-components';
import { Link } from '../../../StyledLink/StyledLink.styled';

export const FaqTabWrapper = styled.div`
  width: 100%;

  .masonry-grid {
    display: flex;
    margin-left: -32px;
    width: auto;

    &__column {
      padding-left: 32px;
      background-clip: padding-box;

      > div {
        margin-bottom: 42px;
      }
    }
  }
`;

export const FaqCard = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  border-radius: 12px;
  padding: 30px;
  width: 100%;
`;

export const FaqLink = styled(Link)`
  padding: 19px 30px 19px 33px;
  display: block;
  margin: 0 -30px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.lightText};
  color: ${({ theme }) => theme.palette.gray};
  font-weight: 400;

  &:last-of-type {
    border-bottom: none;
    padding: 19px 30px 0 33px;
  }

  &:first-of-type {
    margin-top: 20px;
  }

  svg {
    margin-right: 20px;
    position: absolute;
    margin-top: 7px;
  }

  div {
    padding-left: 15px;
  }
`;
