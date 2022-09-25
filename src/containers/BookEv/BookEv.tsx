import { useState } from 'react';
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { StyledLink } from '../../elements';
import { DefaultLayout } from '../../layouts';
import { IGlobalSettings } from '../../interfaces/contentful.types.generated';
import { ArrowLeftIcon } from '../../icons';
import { BookEvContainer, GoBackWrapper, BookEvWrapper } from './BookEv.styled';
import { OrderSummary, ConfirmAndPay, Outro } from './components';
import { useGetPublicCarQuery } from '../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { StripeProvider } from '../../providers';
import { useNextQueryParam } from '../../hooks';

interface PageProps {
  globalSettings: IGlobalSettings;
  title: string;
  carId: string;
}

const BookEv: NextPage<PageProps> = ({ globalSettings, title, carId }) => {
  const [ts, te] = useNextQueryParam(['ts', 'te']);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('');
  const [showOutro, setShowOutro] = useState(false);
  const { data: carData, loading: carLoading } = useGetPublicCarQuery({
    variables: {
      id: carId,
    },
  });
  const car = carData?.car;

  return (
    <DefaultLayout
      backgroundColor="rgb(241, 242, 243)"
      globalSettings={globalSettings}
      isWide={false}
      pageTitle={title}
    >
      <StripeProvider>
        {showOutro ? (
          <Outro />
        ) : (
          <BookEvContainer>
            <GoBackWrapper>
              <StyledLink href={`/car/${car?.id}?start=${ts}&end=${te}`}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowLeftIcon style={{ marginRight: 4 }} /> Back
                </span>
              </StyledLink>
            </GoBackWrapper>
            <BookEvWrapper>
              {carLoading ? (
                <>
                  <Skeleton
                    count={1}
                    height={1048}
                    style={{
                      marginBottom: '10px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
                    }}
                  />
                  <Skeleton
                    count={1}
                    height={678}
                    style={{
                      marginBottom: '10px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
                    }}
                  />
                </>
              ) : (
                <>
                  <ConfirmAndPay
                    car={car}
                    setSelectedPaymentMethodId={setSelectedPaymentMethodId}
                  />
                  <OrderSummary
                    car={car}
                    selectedPaymentMethodId={selectedPaymentMethodId}
                    setShowOutro={setShowOutro}
                  />
                </>
              )}
            </BookEvWrapper>
          </BookEvContainer>
        )}
      </StripeProvider>
    </DefaultLayout>
  );
};

export default BookEv;
