import { Dispatch, SetStateAction } from 'react';
import { Agreements, PaymentCards, SubscriptionCard } from './components';
import YourBundleWrapper from './YourBundle.styled';

interface YourBundleProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
}

const YourBundle = ({ setActiveStep, setActiveNavStep }: YourBundleProps) => (
  <YourBundleWrapper>
    <SubscriptionCard setActiveNavStep={setActiveNavStep} setActiveStep={setActiveStep} />
    <Agreements />
    <PaymentCards />
  </YourBundleWrapper>
);

export default YourBundle;
