import { Heading } from '../../../../../../../elements';
import { MoneyStackIcon } from '../../../../../../../icons';
import { HeadingWrapper, NoCarsWrapper } from './NoPaymentMethods.styled';

const NoPaymentMethods = () => (
  <NoCarsWrapper>
    <MoneyStackIcon />
    <HeadingWrapper>
      <Heading variant="h3">No payment methods available</Heading>
    </HeadingWrapper>
  </NoCarsWrapper>
);

export default NoPaymentMethods;
