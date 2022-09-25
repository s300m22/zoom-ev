import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, DateInput, Select } from '../../../../../elements';
import { useCreateCallRequestMutation } from '../../../../../hooks/api/createCallRequest/createCallRequest.generated';
import { useMyCallRequestQuery } from '../../../../../hooks/api/myCallRequest/myCallRequest.generated';
import { useUpdateCallRequestMutation } from '../../../../../hooks/api/updateCallRequest/updateCallRequest.generated';
import { ClockIcon } from '../../../../../icons';
import { CallRosterRequestCreateInput } from '../../../../../interfaces/api.types.generated';
import { logError } from '../../../../../utils';
import { Wrapper } from './SetupCall.styled';
import { useSnackbar } from '../../../../../hooks';
import mixpanel from 'mixpanel-browser';
import { zonedTimeToUtc } from 'date-fns-tz';
import { addHours, addMilliseconds } from "date-fns";

export enum CallRequestRequestedTimeTypeEnum {
  Am = 'AM',
  Any = 'ANY',
  Pm = 'PM',
}

const SetupCall: React.FC = () => {
  const { handleSubmit, control, trigger, setValue, watch, resetField } =
    useForm<CallRosterRequestCreateInput>({
      mode: 'onBlur',
      defaultValues: {},
    });

  const [editing, setEditing] = useState(false);
  const [createCall, { loading: createLoading }] = useCreateCallRequestMutation();
  const [updateCall, { loading: updateLoading }] = useUpdateCallRequestMutation();
  const showSnackBar = useSnackbar();

  const { data: myCall, loading: loadingMyCall, refetch: refetchMyCall } = useMyCallRequestQuery();

  useEffect(() => {
    if (myCall === undefined) {
      setEditing(true);
    } else {
      setEditing(false);

      if (myCall.myCallRequest) {
        setValue('requestedTime', myCall.myCallRequest?.requestedTime);
        // @ts-expect-error date field actually takes a date as its value
        setValue('requestedDate', new Date(myCall.myCallRequest?.requestedDate));
      }
    }
  }, [myCall, setValue]);

  const onSubmit = async (input: CallRosterRequestCreateInput) => {
    try {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      //converting the date to a UTC date.

      // @ts-expect-error this actually returns a string
      const inputDateLocalTz = Date.parse(input.requestedDate);
      const d = new Date(inputDateLocalTz);
      const tzOffset = d.getTimezoneOffset() * 60 * 1000;
      const utcDate = addMilliseconds(d, Math.abs(tzOffset)).valueOf();

      const action = myCall?.myCallRequest ? updateCall : createCall;
      try {
        await action({
          variables: {
            // @ts-expect-error  this this
            input: myCall?.myCallRequest
              ? {
                  id: myCall.myCallRequest.id,
                  requestedDate: utcDate,
                  requestedTime: input.requestedTime || CallRequestRequestedTimeTypeEnum.Any,
                }
              : {
                  requestedDate: utcDate,
                  requestedTime: input.requestedTime || CallRequestRequestedTimeTypeEnum.Any,
                },
          },
        });

        mixpanel.track('support.call_request.create_update', {
          id: myCall?.myCallRequest?.id ?? null,
          // @ts-expect-error this actually returns a string
          requestedDate: Date.parse(input.requestedDate),
          requestedTime: input.requestedTime || CallRequestRequestedTimeTypeEnum.Any,
        });
      } catch (e: any) {
        showSnackBar({
          message: e.message,
          type: `error`,
        });
      }

      await refetchMyCall();
    } catch (error: any) {
      logError(error);
    }
  };

  const dateSelected = watch('requestedDate');

  const [dateSelectedIsToday, setDateSelectedIsToday] = useState(false);

  useEffect(() => {
    const seld = new Date(dateSelected);

    if (!seld) return;

    const today = new Date();
    setDateSelectedIsToday(
      seld.getDate() == today.getDate() &&
        seld.getMonth() == today.getMonth() &&
        seld.getFullYear() == today.getFullYear(),
    );
  }, [dateSelected]);

  useEffect(() => {
    if (dateSelectedIsToday) {
      setValue('requestedTime', CallRequestRequestedTimeTypeEnum.Any);
    }
  }, [dateSelectedIsToday, resetField, setValue]);

  return (
    <Wrapper>
      <h2>Speak to our EV experts</h2>
      <div className="box">
        <div className="content">
          Make a request for one of our experts to give you a call to discuss the benefits included
          with your bundle.
          <div className="times">
            <ClockIcon height={18} width={18} />
            <div className="title">Phone lines open:</div>
            <div>
              <p className="row">
                Mon - Friday<strong>9:00am - 5:00pm</strong>
              </p>
              <p className="row">Closed Weekends & Bank Holidays</p>
              {dateSelectedIsToday}
            </div>
          </div>
        </div>
        <div className="form">
          {loadingMyCall && <div>Loading...</div>}
          {!loadingMyCall && (editing || !myCall?.myCallRequest) && (
            <>
              <h4>Specify a time (Optional)</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DateInput locale="en-GB" control={control} name="requestedDate" />

                <Controller
                  control={control}
                  name="requestedTime"
                  render={({ field: { onChange, value } }) => (
                    <>
                      {/* {value} */}
                      <Select onChange={onChange} value={value}>
                        <option data-value={'ANY'} key="any" label="No Preference">
                          No Preference
                        </option>
                        {!dateSelectedIsToday && (
                          <option data-value="AM" key="AM">
                            AM
                          </option>
                        )}
                        {!dateSelectedIsToday && (
                          <option data-value="PM" key="PM">
                            PM
                          </option>
                        )}
                      </Select>
                    </>
                  )}
                />
                <Button isLoading={createLoading || updateLoading} type="submit" withArrow>
                  {myCall?.myCallRequest ? 'Update call time' : 'Request a call'}
                </Button>
              </form>
            </>
          )}
          {!loadingMyCall && myCall?.myCallRequest && !editing && (
            <div className="call-confirmation">
              <div>
                <h4>We look forward to speaking to you</h4>
                <p>Your call request has been confirmed.</p>
                <p>We will be in touch soon.</p>
                <p>
                  Call request:{' '}
                  <strong>
                    {new Date(myCall.myCallRequest.requestedDate).toLocaleDateString('en-GB')},{' '}
                    {myCall.myCallRequest?.requestedTime}
                  </strong>
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditing(true);
                }}
                type="button"
                withArrow
              >
                Change time
              </Button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default SetupCall;
