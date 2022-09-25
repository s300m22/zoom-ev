import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../elements/SimpleCard/SimpleCard.styled';

export const Wrapper = styled.div`
  text-align: center;

  ${SimpleCardWrapper} {
    margin-top: 50px;
  }
`;

export const Paragraph = styled.p`
  font-size: 14px;
  margin: 3px 0 -24px;
  line-height: 21px;
`;

export const PolicySection = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary};
  margin: 32px 15px 0;
`;

export const NoticeSection = styled.div`
  margin-left: 10px;
  img {
    width: 80px;
    height: 80px;
  }
  > p {
    margin: 5px 0;
  }
`;
