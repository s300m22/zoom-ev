import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, TextField, Heading } from '../../../../elements';
import { CloseIcon } from '../../../../icons';
import { useSnackbar } from '../../../../hooks';
import { formatPrice, logError } from '../../../../utils';
import {
  DiscountCodeWrapper,
  DiscountForm,
  ShowDiscountCode,
  PromoCodeApplied,
  PromoCodeText,
  PromoCodeValue,
} from './DiscountCode.styled';
import { receivedBundlesAtom } from '../../../../recoil';
import { useValidatePromotionCodeV2Mutation } from '../../../../hooks/api/validatePromotionCode/validatePromotionCode.generated';

interface DiscountCodeProps {
  bundlePrice: number;
  setCouponPromoCode: Dispatch<SetStateAction<string>>;
  setIsLbgCouponCode: Dispatch<SetStateAction<boolean>>;
}

const DiscountCode = ({
  bundlePrice,
  setCouponPromoCode,
  setIsLbgCouponCode,
}: DiscountCodeProps) => {
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState('');
  const [promoCodeDiscountValue, setPromoCodeDiscountValue] = useState(0);
  const showSnackbar = useSnackbar();
  const [submitDiscountCode] = useValidatePromotionCodeV2Mutation();
  const receivedBundles = useRecoilValue(receivedBundlesAtom);
  const setReceivedBundles = useSetRecoilState(receivedBundlesAtom);
  const bundleOriginalPrice = useRef(bundlePrice);
  const { register, getValues, reset } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async () => {
    try {
      const code = getValues('code');
      setLoading(true);
      if (!code) {
        showSnackbar({ message: 'Oops, promotion code empty.', type: 'warning' });
      } else {
        const response = await submitDiscountCode({
          variables: {
            code,
          },
        });
        reset();
        const promoCodeDetails = response.data?.validatePromotionCodeV2;
        if (!promoCodeDetails || !promoCodeDetails.active || !promoCodeDetails.valid) {
          showSnackbar({ message: 'Oops, wrong promotion code.', type: 'error' });
          setCouponPromoCode('');
        } else if (receivedBundles) {
          const { amountOff, percentOff } = promoCodeDetails;
          let savings = amountOff || 0;
          if (percentOff) {
            savings = (receivedBundles.price * percentOff) / 100;
          }
          const discountedPrice = receivedBundles.price - savings;
          setPromoCodeApplied(code);
          setCouponPromoCode(code);
          setPromoCodeDiscountValue(savings);
          receivedBundles &&
            setReceivedBundles({
              ...receivedBundles,
              price: discountedPrice,
            });
          showSnackbar({
            message: `Promotion code applied successfully. You just saved ${formatPrice(
              savings / 100,
            )}.`,
            type: 'success',
          });
          const business = promoCodeDetails.metadata?.find((v) => v.key === 'business');
          setIsLbgCouponCode((business && business.value === 'lbg') ?? false);
        }
      }
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      setCouponPromoCode('');
    } finally {
      setLoading(false);
    }
  };

  const resetCode = () => {
    setShowPromoCode(false);
    setPromoCodeApplied('');
    receivedBundles &&
      setReceivedBundles({
        ...receivedBundles,
        price: bundleOriginalPrice.current,
      });
    setPromoCodeDiscountValue(0);
    setIsLbgCouponCode(false);
  };

  if (promoCodeApplied) {
    return (
      <DiscountCodeWrapper>
        <PromoCodeApplied>
          <PromoCodeText>
            Promo code:{' '}
            <PromoCodeValue>
              {promoCodeApplied} <CloseIcon onClick={resetCode} />
            </PromoCodeValue>
          </PromoCodeText>
          <Heading variant="h6">- {formatPrice(promoCodeDiscountValue / 100)}</Heading>
        </PromoCodeApplied>
      </DiscountCodeWrapper>
    );
  }

  if (!showPromoCode) {
    return (
      <DiscountCodeWrapper>
        <ShowDiscountCode onClick={() => setShowPromoCode(!showPromoCode)}>
          Do you have a discount code?
        </ShowDiscountCode>
      </DiscountCodeWrapper>
    );
  }

  return (
    <DiscountCodeWrapper>
      <DiscountForm id="discountCodeForm">
        <TextField
          {...register('code')}
          disabled={loading}
          form="discountCodeForm"
          label=""
          placeholder="Promo code"
        />
        <Button
          form="discountCodeForm"
          isLoading={loading}
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Apply
        </Button>
        <CloseIcon onClick={resetCode} style={{ color: 'red' }} />
      </DiscountForm>
    </DiscountCodeWrapper>
  );
};

export default DiscountCode;
