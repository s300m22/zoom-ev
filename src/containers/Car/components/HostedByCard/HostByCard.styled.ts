import styled from 'styled-components';
import { ListItem } from '../../../../elements/List/List.styled';

export const HostedByHeader = styled.div`
  margin: 30px -30px 50px;
  border-bottom: 1px solid #ececec;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 30px 30px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-wrap: nowrap;
  }
`;

export const HostedByImageWrapper = styled.div`
  display: flex;
  margin-right: 30px;
`;

export const HostedByDescriptionWrapper = styled.div``;

export const HostedByFeaturesWrapper = styled.div`
  ${ListItem} {
    font-size: 16px;
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

export const RatingsCount = styled.span`
  margin-left: 5px;
  display: inline-block;
`;
