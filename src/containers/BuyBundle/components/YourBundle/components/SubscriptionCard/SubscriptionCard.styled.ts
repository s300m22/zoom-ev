import styled from 'styled-components';
import { ListItem, ListWrapper } from '../../../../../../elements/List/List.styled';
import {
  SimpleCardWrapper,
  SimpleCardFooter,
} from '../../../../../../elements/SimpleCard/SimpleCard.styled';

export const SubscriptionCardWrapper = styled.div`
  width: 100%;

  ${SimpleCardWrapper} {
    flex-direction: column;
  }

  ${SimpleCardFooter} {
    display: flex;
    justify-content: center;
  }

  ${ListWrapper} {
    align-items: center;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      align-items: flex-start;
    }
  }

  ${ListItem} {
    font-size: 16px;
    text-align: left;
    color: ${({ theme }) => theme.palette.gray};

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      padding-right: 45px;
    }
  }
`;

export const SubscriptionCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SubscriptionCardBundleLogo = styled.div`
  width: 130px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const SubscriptionCardBundleDescriptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: calc(100% - 130px);
    justify-content: space-between;
    flex-wrap: nowrap;
  }
`;

export const SubscriptionCardBundleDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 25px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 0 25px;
    text-align: left;
  }
`;

export const SubscriptionCardBundlePrice = styled.div`
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
  }
`;

export const AlreadySubscribedThing = styled.p`
  color: red;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
