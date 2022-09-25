import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Heading, StatusEnum, StatusLabel } from '../../../../../../../elements';
import ContinueSetupCarPopup from '../../../../../../../elements/Popups/ContinueSetupCarPopup';
import { UserDetailsApprovalStatusEnum } from '../../../../../../../interfaces/api.types.generated.d';
import { userDetailsAtom, vehicleSetupAtom } from '../../../../../../../recoil';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
  StatusesButtonsWrapper,
} from '../../StatusesShared';

interface CarSetupProps {
  carId?: string;
  shouldContinue?: boolean;
}

export const CarSetup = ({ carId, shouldContinue = false }: CarSetupProps) => {
  const router = useRouter();
  const userDetails = useRecoilValue(userDetailsAtom);
  const setVehicleDetails = useSetRecoilState(vehicleSetupAtom);
  const setupEnabled =
    userDetails?.details.approvalStatus !== UserDetailsApprovalStatusEnum.Approved;

  return (
    <StatusesCardWrapper>
      <StatusesTextWrapper>
        <Heading variant="h4">EV setup</Heading>
        <StatusesParagraph>Setup an electric or hybrid car or van</StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        {setupEnabled ? (
          <StatusLabel status={StatusEnum.Rejected}>Profile not approved</StatusLabel>
        ) : null}
        <StatusesButtonsWrapper>
          {shouldContinue && carId ? (
            <ContinueSetupCarPopup carId={carId} />
          ) : (
            <Button
              disabled={setupEnabled}
              onClick={() => {
                setVehicleDetails(undefined);
                router.push('/vehicle-setup');
              }}
              variant="outlined"
              withArrow
            >
              List your EV
            </Button>
          )}
        </StatusesButtonsWrapper>
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  );
};
export default CarSetup;
