import { Dispatch, SetStateAction, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useFormContext } from 'react-hook-form';

import { Button, SimpleCard, Heading, Image, Checkbox, StyledLink } from '../../../../elements';
import { formatPrice } from '../../../../utils';
import {
  CardFooterWrapper,
  OrderSummaryWrapper,
  OrderSummaryDetails,
  ImageWrapper,
  OrderSummaryDetailsDescription,
  OrderSummaryDetailsPrice,
  OrderSummaryTotal,
} from './OrderSummary.styled';
import DiscountCode from '../DiscountCode';
import { checkoutBundleLoadingAtom } from '../../../../recoil';
import { DefaultBundleIcon } from '../../../../icons';
import { BundleTypePeriodDurationEnum } from '../../../../interfaces/api.types.generated.d';

const CardFooter = () => {
  const checkoutBundleLoading = useRecoilValue(checkoutBundleLoadingAtom);
  return (
    <CardFooterWrapper>
      <Button id="complete-checkout" isLoading={checkoutBundleLoading} type="submit" withArrow>
        Complete order
      </Button>
    </CardFooterWrapper>
  );
};

interface OrderSummaryProps {
  bundleName: string;
  bundlePrice: number;
  bundleImage?: string;
  periodDuration: BundleTypePeriodDurationEnum;
  isDefault: boolean;
  setCouponPromoCode: Dispatch<SetStateAction<string>>;
  setIsLbgCouponCode: Dispatch<SetStateAction<boolean>>;
}

const OrderSummary = ({
  bundleName,
  bundleImage,
  bundlePrice,
  periodDuration,
  isDefault,
  setCouponPromoCode,
  setIsLbgCouponCode,
}: OrderSummaryProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const defaultPrice = useRef(bundlePrice);
  return (
    <SimpleCard footer={<CardFooter />}>
      <OrderSummaryWrapper>
        <Heading variant="h4">Order summary</Heading>
        <OrderSummaryDetails>
          <ImageWrapper>
            {bundleImage ? <Image asset={bundleImage} /> : <DefaultBundleIcon />}
          </ImageWrapper>
          <OrderSummaryDetailsDescription>
            <div>
              <Heading variant="h6">{bundleName}</Heading>
              <p>{periodDuration} subscription</p>
            </div>
            <OrderSummaryDetailsPrice>
              <Heading variant="h6">
                {isDefault ? formatPrice(defaultPrice.current / 100) : formatPrice(0)}
              </Heading>
            </OrderSummaryDetailsPrice>
          </OrderSummaryDetailsDescription>
        </OrderSummaryDetails>
        {isDefault ? (
          <DiscountCode
            bundlePrice={defaultPrice.current}
            setCouponPromoCode={setCouponPromoCode}
            setIsLbgCouponCode={setIsLbgCouponCode}
          />
        ) : null}

        <OrderSummaryTotal>
          <Heading variant="h6">Total (VAT incl.)</Heading>
          <Heading variant="h4">
            {isDefault ? (
              formatPrice(bundlePrice / 100)
            ) : (
              <>
                {/* <OrderSummaryDiscountedPrice>
                  {formatPrice(bundlePrice / 100)}
                </OrderSummaryDiscountedPrice> */}
                {formatPrice(0)}
              </>
            )}
          </Heading>
        </OrderSummaryTotal>

        <Checkbox
          {...register('terms', { required: true })}
          customStyles={{
            fontSize: '16px',
            margin: '10px 0 0',
          }}
          errors={errors}
          label={
            <>
              I accept the{' '}
              <StyledLink color="blue" externalLink href="/terms-and-conditions">
                Terms and Conditions
              </StyledLink>
              &nbsp;and&nbsp;
              <StyledLink color="blue" externalLink href="/privacy-policy">
                Privacy Policy
              </StyledLink>
            </>
          }
          required
        />
      </OrderSummaryWrapper>
    </SimpleCard>
  );
};
export default OrderSummary;
