/* eslint-disable no-nested-ternary */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Event } from 'react-big-calendar';
import { useForm, useWatch } from 'react-hook-form';
import compareAsc from 'date-fns/compareAsc';
import differenceInDays from 'date-fns/differenceInDays';
import isPast from 'date-fns/isPast';
import add from 'date-fns/add';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { logError } from '../../../utils';
import Button from '../../Button';
import Heading from '../../Heading';
import Popup from '../../Popup';
import { Checkbox, DateInput } from '../../Inputs';
import {
  ButtonsWrapper,
  EventsDetailsPopupWrapper,
  FormWrapper,
  Paragraph,
  Error,
} from './AddEventsDetailsPopup.styled';
import { useAddCarAvailabilityPeriodMutation } from '../../../hooks/api/addCarAvailabilityPeriod/addCarAvailabilityPeriod.generated';
import { AddCarAvailabilityPeriodInputType } from '../../../interfaces/api.types.generated';
import { useSnackbar, useIsBusiness } from '../../../hooks';
import { vehicleSetupAtom } from '../../../recoil';

export interface AddEventsDetailsPopupProps {
  eventsList: Array<Event> | undefined;
  event: AddCarAvailabilityPeriodInputType;
  showPopup: boolean;
  isEdit?: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

interface EventDataProps {
  timeStart?: Date;
  timeEnd?: Date;
  recurringUntil?: Date;
  recurringWeekly?: boolean;
  allDay: boolean;
}

const RECURRENCE_MAX = 7;

const AddEventsDetailsPopup = ({
  eventsList,
  event,
  showPopup,
  setShowPopup,
  isEdit,
}: AddEventsDetailsPopupProps) => {
  const isBusiness = useIsBusiness();
  const showSnackbar = useSnackbar();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState('');
  const [addCarAvailabilityPeriod] = useAddCarAvailabilityPeriodMutation({
    refetchQueries: ['getCar'],
    awaitRefetchQueries: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    control,
  } = useForm<EventDataProps>({
    mode: 'onChange',
  });

  const isAllDay = useWatch<any>({
    control,
    name: 'allDay',
  });

  const startDate = useWatch<any>({
    control,
    name: 'timeStart',
  });

  const endDate = useWatch<any>({
    control,
    name: 'timeEnd',
  });

  const recurringWeekly = useWatch<any>({
    control,
    name: 'recurringWeekly',
  });

  useEffect(() => {
    if (startDate && endDate) {
      if (isPast(startDate)) {
        setError('You can only select future dates.');
      } else if (recurringWeekly && differenceInDays(endDate, startDate) > RECURRENCE_MAX) {
        setError('Reccuring event may not be longer than one week.');
      } else if (compareAsc(startDate, endDate) > 0 && !isAllDay) {
        setError('End date must be later than start date.');
      } else {
        setError('');
      }
    }
  }, [startDate, endDate, recurringWeekly, isAllDay]);

  const prepareEventData = (input: EventDataProps) => {
    const { timeStart, timeEnd, recurringUntil, recurringWeekly: isRecurring } = input;
    if (timeStart && timeEnd) {
      const timeEndPlus = add(timeEnd, { seconds: 1 });
      const timeEndDate = add(startOfDay(timeStart), { days: 1 });
      return {
        carId: event.carId,
        timeStart: (isAllDay ? startOfDay(timeStart) : timeStart).getTime(),
        timeEnd: (compareAsc(timeEndPlus, endOfDay(timeEnd)) === 1
          ? timeEndPlus
          : isAllDay
          ? timeEndDate
          : timeEnd
        ).getTime(),
        recurringWeekly: isRecurring,
        ...(recurringUntil && {
          recurringUntil: recurringUntil.getTime(),
        }),
      };
    }
    return undefined;
  };

  const prepareRecurringEvents = (rEvent: AddCarAvailabilityPeriodInputType) => {
    let recurringEventsList = [] as Array<AddCarAvailabilityPeriodInputType>;
    let start = rEvent.timeStart;
    let end = rEvent.timeEnd;
    if (rEvent.recurringUntil && rEvent.recurringWeekly && start && end) {
      recurringEventsList = [
        ...recurringEventsList,
        {
          carId: rEvent.carId,
          timeStart: start,
          timeEnd: end,
        },
      ];
      while (compareAsc(end, rEvent.recurringUntil) < 0) {
        start = add(start, { days: 7 }).getTime();
        end = add(end, { days: 7 }).getTime();
        recurringEventsList = [
          ...recurringEventsList,
          {
            carId: rEvent.carId,
            timeStart: start,
            timeEnd: end,
          },
        ];
      }
      return recurringEventsList;
    }
    return [rEvent];
  };

  const onSubmit = async (input: EventDataProps) => {
    try {
      setInternalLoading(true);
      const { timeStart, timeEnd } = input;
      const isValid = await trigger();

      if (!isValid && !error) {
        return;
      }

      if (timeStart && timeEnd) {
        const isEvenOverlapping = eventsList
          ? eventsList.findIndex(
              (e) =>
                areIntervalsOverlapping(
                  { start: new Date(timeStart), end: new Date(timeEnd) },
                  { start: e.start as Date, end: e.end as Date },
                ) === true,
            )
          : -1;

        if (isEvenOverlapping === -1) {
          const preparedEvent = prepareEventData(input);
          if (!isBusiness || isEdit) {
            if (preparedEvent) {
              const response = await addCarAvailabilityPeriod({
                variables: {
                  input: {
                    ...preparedEvent,
                  },
                },
              });
              if (response.errors) {
                showSnackbar({ message: 'Missing event data. Please try again.', type: 'error' });
                return;
              }

              showSnackbar({
                message: 'Car availability period added successfully.',
                type: 'success',
              });
              reset();
              setError('');
            } else {
              showSnackbar({ message: 'Missing event data. Please try again.', type: 'error' });
            }
          }
          const periods = carDetails?.availabilityPeriods || [];
          carDetails &&
            setCarDetails({
              ...carDetails,
              availabilityPeriods: preparedEvent
                ? [...periods, ...prepareRecurringEvents(preparedEvent)]
                : [...periods],
            });
        } else {
          setError('Events can not overlap each others.');
        }
      }
    } catch (err) {
      logError(err);
    } finally {
      setShowPopup(false);
      setInternalLoading(false);
    }
  };

  return (
    <Popup isOpen={showPopup} maxHeight="691px" setIsOpen={setShowPopup}>
      <EventsDetailsPopupWrapper>
        <Heading variant="h3">Add availability</Heading>
        <Paragraph>In these times, Guests will be able to book your EV.</Paragraph>
        <FormWrapper id="event-details-form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DateInput
            control={control}
            endDate={event.timeEnd ? new Date(event.timeEnd) : null}
            errors={errors}
            label={isAllDay ? 'Date' : 'Start'}
            name="timeStart"
            prefilledDate={event.timeStart}
            required
            showClock={Boolean(!isAllDay)}
          />

          <Checkbox
            {...register('allDay')}
            customStyles={{
              fontSize: '16px',
              margin: '0 0 10px 0',
            }}
            errors={errors}
            label="All day"
          />

          <div style={{ display: isAllDay ? 'none' : 'block' }}>
            <DateInput
              control={control}
              errors={errors}
              label="End"
              name="timeEnd"
              prefilledDate={event.timeEnd}
              required
              showClock={Boolean(!isAllDay)}
              startDate={event.timeStart ? new Date(event.timeStart) : null}
            />
          </div>

          <Checkbox
            {...register('recurringWeekly')}
            customStyles={{
              fontSize: '16px',
              margin: '0 0 10px 0',
            }}
            errors={errors}
            label="Repeats every week"
          />

          <div style={{ display: recurringWeekly ? 'block' : 'none' }}>
            <DateInput
              control={control}
              errors={errors}
              label="Recurrence ends"
              name="recurringUntil"
              prefilledDate={event.timeEnd}
            />
          </div>

          <Error>{error}</Error>
        </FormWrapper>
        <ButtonsWrapper>
          <Button disabled={Boolean(error)} form="event-details-form" isLoading={internalLoading}>
            Save
          </Button>
          <Button
            isLoading={internalLoading}
            onClick={() => {
              setShowPopup(false);
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </ButtonsWrapper>
      </EventsDetailsPopupWrapper>
    </Popup>
  );
};
export default AddEventsDetailsPopup;
