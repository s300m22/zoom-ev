import { StyledLink } from '../../../../../../elements';
import AgreementsWrapper from './Agreements.styled';

const Agreements = () => (
  <AgreementsWrapper>
    By proceeding you accept{' '}
    <StyledLink color="blue" externalLink href="/terms-and-conditions">
      Terms and Conditions
    </StyledLink>
    &nbsp;and&nbsp;
    <StyledLink color="blue" externalLink href="/privacy-policy ">
      Privacy Policy
    </StyledLink>
  </AgreementsWrapper>
);

export default Agreements;
