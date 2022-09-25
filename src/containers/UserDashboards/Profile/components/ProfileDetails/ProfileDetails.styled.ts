import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';

export const ProfileDetailsCard = styled(SimpleCardWrapper)`
  padding: 20px 30px;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }
`;

export const ProfileDetailsCardIconWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 55px;
    margin-right: 40px;
    margin-bottom: 0;
  }
`;
export const ProfileDetailsParagraph = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
`;
