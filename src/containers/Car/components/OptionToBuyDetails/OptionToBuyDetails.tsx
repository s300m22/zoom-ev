import React from 'react';
import { SimpleCard } from '../../../../elements';
import { StyledButton } from '../../../../elements/Button/Button.styled';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { Wrapper } from './OptionToBuyDetails.styled';
import { formatPrice } from '../../../../utils';
import EnquireWithSeller from '../EnquireWithSeller';
import { CarRentalRequestRenterQuery } from '../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';

interface OptionToBuyDetailsProps {
  car: GetPublicCarQuery['car'] | CarRentalRequestRenterQuery['carRentalRequest']['car'];
}

const OptionToBuyDetails: React.FC<OptionToBuyDetailsProps> = ({ car }) => {
  const salesInfo = car?.salesInfo;
  return (
    <SimpleCard customStyles={{ backgroundColor: '#06102A', color: 'white' }}>
      <Wrapper>
        <div className="left">
          <h2>Want to keep it? This EV is also for sale!</h2>
          <p>{salesInfo?.description}</p>
          <EnquireWithSeller
            buttonText={'Enquire with seller'}
            email={salesInfo?.email}
            phoneNumber={salesInfo?.phoneNumber}
          />
        </div>
        <div className="right">
          <h3 className="dets">
            Purchase Price: <span className="price">{formatPrice(salesInfo?.price)}</span>
          </h3>
          {salesInfo?.url && (
            <StyledButton
              color="blue"
              onClick={() => {
                window.open(salesInfo?.url ?? '', '_blank');
              }}
              variant="contained"
            >
              Buy Online
            </StyledButton>
          )}
        </div>
      </Wrapper>
    </SimpleCard>
  );
};

export default OptionToBuyDetails;
