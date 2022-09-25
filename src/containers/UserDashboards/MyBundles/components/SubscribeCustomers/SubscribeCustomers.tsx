/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Table,
  THead,
  TH,
  TR,
  TD,
  TBody,
  NoData,
  SubText,
  BoldText,
} from '../../../../../elements';
import { useGrantedBundleSubscriptionResellerDiscountsQuery } from '../../../../../hooks/api/grantedBundleSubscriptionResellerDiscounts/grantedBundleSubscriptionResellerDiscounts.generated';
import { useSendBundleSubscriptionResellerDiscountNotificationMutation } from '../../../../../hooks/api/sendBundleSubscriptionResellerDiscountNotification/sendBundleSubscriptionResellerDiscountNotification.generated';
import { MinusIcon, TickIcon } from '../../../../../icons';
import { customerBundlesAtom } from '../../../../../recoil';
import { convertToReadableDateFormat, logError } from '../../../../../utils';
import { useSnackbar } from '../../../../../hooks';

const ResendInvitation = styled.span`
  color: ${({ theme }) => theme.palette.blue};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

const SubscribeCustomers = () => {
  const showSnackbar = useSnackbar();
  const [resendInvitation] = useSendBundleSubscriptionResellerDiscountNotificationMutation();
  const customerBundles = useRecoilValue(customerBundlesAtom);
  const setCustomerBundles = useSetRecoilState(customerBundlesAtom);
  const { data, loading } = useGrantedBundleSubscriptionResellerDiscountsQuery();
  const customersBundlesData = data?.grantedBundleSubscriptionResellerDiscounts;

  useEffect(() => {
    if (!loading && customersBundlesData) {
      const filterdCustomersBundles = customersBundlesData.filter(
        (customerBundle) => customerBundle.status !== 'REVOKED',
      );
      setCustomerBundles(filterdCustomersBundles);
    }
  }, [customersBundlesData, loading, setCustomerBundles]);

  const resend = async (id: string) => {
    try {
      await resendInvitation({
        variables: {
          resellerDiscountId: id,
        },
      });
      showSnackbar({ message: 'Invitation resend successfully.', type: 'success' });
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
  };

  if (loading) return <Skeleton count={1} height={148} style={{ borderRadius: '12px' }} />;

  return (
    <Table id="customersTable">
      <THead>
        <TR>
          <TH style={{ width: '15%' }}>Sales</TH>
          <TH style={{ width: '25%' }}>Customer</TH>
          <TH style={{ width: '10%' }}>Make</TH>
          <TH style={{ width: '10%' }}>Model</TH>
          <TH style={{ width: '12.5%' }}>Delivery date</TH>
          <TH style={{ width: '5%' }}>Fleet</TH>
          <TH style={{ width: '12.5%' }}>Invitation date</TH>
          <TH style={{ width: '10%' }} />
        </TR>
      </THead>
      <TBody>
        {customerBundles?.length ? (
          customerBundles
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((customer) => (
              <TR key={customer.id}>
                <TD>
                  {customer.createdBy?.details.firstName} {customer.createdBy?.details.lastName}
                </TD>
                <TD>
                  <BoldText>
                    {customer.grantee.firstName} {customer.grantee.lastName}
                  </BoldText>
                  <SubText style={{ margin: '5px 0 0', whiteSpace: 'nowrap' }}>
                    {customer.grantee.email}
                  </SubText>
                  <SubText style={{ margin: '5px 0 0', whiteSpace: 'nowrap' }}>
                    {customer.grantee.phoneNumber.replace('|', ' ')}
                  </SubText>
                </TD>
                <TD>{customer.carMakerName}</TD>
                <TD>{customer.carModelName}</TD>
                <TD style={{ whiteSpace: 'nowrap' }}>
                  {customer.estimatedCarDeliveryDate
                    ? convertToReadableDateFormat({
                        date: parseInt(customer.estimatedCarDeliveryDate, 10),
                        mutable: true,
                      })
                    : null}
                </TD>
                <TD>
                  {customer.isCarPartOfFleet ? (
                    <>
                      <span style={{ display: 'none' }}>X</span>
                      <TickIcon />
                    </>
                  ) : (
                    <MinusIcon />
                  )}
                </TD>
                <TD style={{ whiteSpace: 'nowrap' }}>
                  {convertToReadableDateFormat({ date: customer.createdAt })}
                </TD>
                <TD>
                  <ResendInvitation onClick={() => resend(customer.id)}>Resend</ResendInvitation>
                </TD>
              </TR>
            ))
        ) : (
          <TR>
            <NoData colSpan={8}>No data.</NoData>
          </TR>
        )}
      </TBody>
      <TBody />
    </Table>
  );
};
export default SubscribeCustomers;
