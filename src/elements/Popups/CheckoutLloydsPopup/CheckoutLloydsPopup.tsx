import { useState } from 'react';
import { useRouter } from 'next/router';
import { DefaultBundleIcon } from '../../../icons';
import Button from '../../Button';
import Heading from '../../Heading';
import Image from '../../Image';
import Popup from '../../Popup';
import {
  ImageWrapper,
  ButtonsWrapper,
  CheckoutLloydsPopupWrapper,
} from './CheckoutLloydsPopup.styled';
import { useMarkSubscriptionAsLbgMutation } from '../../../hooks/api/markSubscriptionAsLbg/markSubscriptionAsLbg.generated';

export interface CheckoutLloydsPopupProps {
  partnerImage?: string;
  subscriptionId: string;
}

const CheckoutLloydsPopup = ({ partnerImage, subscriptionId }: CheckoutLloydsPopupProps) => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(true);
  const [markAsLbg] = useMarkSubscriptionAsLbgMutation();

  const submit = async (val: boolean) => {
    try {
      await markAsLbg({
        variables: {
          response: val,
          subscriptionId,
        },
      });
    } catch (error: any) {} // eslint-disable-line

    router.push('/dashboard/bundles');
  };
  return (
    <Popup dismissible={false} isOpen={openPopup} setIsOpen={setOpenPopup}>
      <CheckoutLloydsPopupWrapper>
        <ImageWrapper>
          {partnerImage ? <Image asset={partnerImage} /> : <DefaultBundleIcon />}
        </ImageWrapper>

        <Heading variant="h3">
          Your Bundle is ready! Please help us by answering one last thing...
        </Heading>
        <p>Are you an existing Lloyds Bank or Halifax customer? </p>
        <ButtonsWrapper>
          <Button id="Lloyds-or-halifax-yes" onClick={() => submit(true)}>
            YES I am
          </Button>{' '}
          <Button id="Lloyds-or-halifax-no" onClick={() => submit(false)}>
            No I am not
          </Button>
        </ButtonsWrapper>
      </CheckoutLloydsPopupWrapper>
    </Popup>
  );
};
export default CheckoutLloydsPopup;
