import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../../../elements/SimpleCard/SimpleCard.styled';

export const PaymentMethodWrapper = styled(SimpleCardWrapper)`
  flex-direction: row;

  span {
    font-weight: 500;
    margin-right: 20px;
  }
`;

export default PaymentMethodWrapper;
