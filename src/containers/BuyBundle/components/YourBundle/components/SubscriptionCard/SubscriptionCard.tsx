import { Dispatch, SetStateAction } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button, Heading, List, SimpleCard, SubText } from '../../../../../../elements';
import { useGetBundlesThatICanPurchaseQuery } from '../../../../../../hooks/api/getBundlesThanICanPurchase/getBundlesThatICanPurchase.generated';
import { DefaultBundleIcon } from '../../../../../../icons';
import { formatPrice } from '../../../../../../utils';
import {
  SubscriptionCardHeader,
  SubscriptionCardWrapper,
  SubscriptionCardBundleLogo,
  SubscriptionCardBundlePrice,
  SubscriptionCardBundleDescriptionWrapper,
  SubscriptionCardBundleDescription,
} from './SubscriptionCard.styled';

interface SubscriptionCardProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
}

const bundleBenefits = [
  'Save up to  to £650 in your first year',
  'Discounts for essential services for your EV',
  "Big Brands you'll use",
  'Friendly help & advice from Zoom EV',
];

const SubscriptionCard = ({ setActiveStep, setActiveNavStep }: SubscriptionCardProps) => {
  const { data: bundleData, loading: bundleLoading } = useGetBundlesThatICanPurchaseQuery();
  const bundle = bundleData?.bundleTypeThatICanPurchase;
  const bundlePrice = bundle?.price;
  const bundleName = bundle?.name;
  const bundleDescritpion = bundle?.description;

  return (
    <SubscriptionCardWrapper>
      <SimpleCard
        footer={
          <Button
            onClick={() => {
              setActiveStep(1);
              setActiveNavStep(1);
            }}
            withArrow
          >
            Buy now
          </Button>
        }
      >
        <SubscriptionCardHeader>
          {!bundleLoading ? (
            <>
              <SubscriptionCardBundleLogo>
                <DefaultBundleIcon />
              </SubscriptionCardBundleLogo>
              <SubscriptionCardBundleDescriptionWrapper>
                <SubscriptionCardBundleDescription>
                  <Heading variant="h4">{bundleName}</Heading>
                  <SubText style={{ margin: 0 }}>{bundleDescritpion}</SubText>
                </SubscriptionCardBundleDescription>
                <SubscriptionCardBundlePrice>
                  <Heading variant="h2">{bundlePrice && formatPrice(bundlePrice / 100)}</Heading>
                </SubscriptionCardBundlePrice>
              </SubscriptionCardBundleDescriptionWrapper>
            </>
          ) : (
            <Skeleton
              count={1}
              height={80}
              style={{
                marginBottom: '10px',
                borderRadius: '12px',
                boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
              }}
            />
          )}
        </SubscriptionCardHeader>
        <List listColumns={2} listItems={bundleBenefits} />
      </SimpleCard>
    </SubscriptionCardWrapper>
  );
};
export default SubscriptionCard;
