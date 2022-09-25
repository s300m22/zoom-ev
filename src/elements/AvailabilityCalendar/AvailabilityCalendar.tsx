import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, stringOrDate, ToolbarProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import sub from 'date-fns/sub';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import isPast from 'date-fns/isPast';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { enGB } from 'date-fns/locale';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AvailabilityCalendarTitle,
  AvailabilityCalendarWrapper,
  ToolbarClear,
  ToolbarLabel,
  ToolbarNavigation,
  ToolbarNavigationWrapper,
  ToolbarPart,
  ToolbarWrapper,
} from './AvailabilityCalendar.styled';
import { useIsBusiness, useSnackbar } from '../../hooks';
import { AddEventsDetailsPopup } from '../Popups';
import { AddCarAvailabilityPeriodInputType } from '../../interfaces/api.types.generated.d';
import { useDeleteCarAvailabilityPeriodMutation } from '../../hooks/api/deleteCarAvailabilityPeriod/deleteCarAvailabilityPeriod.generated';
import { logError } from '../../utils';
import { useDeleteCarAvailabilityPeriodChainMutation } from '../../hooks/api/deleteCarAvailabilityPeriodChain/deleteCarAvailabilityPeriodChain.generated';
import { BoldText, Button, Heading } from '..';
import Popup from '../Popup';
import { vehicleSetupAtom } from '../../recoil';
import { useGetCarLazyQuery } from '../../hooks/api/getCar/getCar.generated';

const locales = {
  'en-GB': enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formats = {
  dateFormat: 'dd/MM/yyyy',
  dayFormat: 'EEEE, dd/MM',
  timeGutterFormat: 'h aaa',
  dayHeaderFormat: 'dd/MM/yyyy',
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'hh:mm a')} - ${format(end, 'hh:mm a')}`,
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'dd MMM.')} - ${format(end, 'dd MMM.')}`,
};

interface AddEventProps {
  start: stringOrDate;
  end: stringOrDate;
}

export interface AvailabilityCalendarProps {
  carId?: string;
  title?: string;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setActiveNavStep?: Dispatch<SetStateAction<number>>;
  isEdit?: boolean;
}

const AvailabilityCalendar = ({
  carId,
  title,
  isEdit,
  setIsLoading,
  setActiveNavStep,
}: AvailabilityCalendarProps) => {
  const isBusiness = useIsBusiness();
  const showSnackbar = useSnackbar();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [newEvent, setNewEvent] = useState<AddCarAvailabilityPeriodInputType>();
  const [showPopup, setShowPopup] = useState(false);
  const [getCarDetails, { data: carData, refetch: refetchCarData }] = useGetCarLazyQuery({
    fetchPolicy: 'network-only',
  });
  const car = carData?.car;

  const availabilityPeriods = useMemo(() => {
    return carDetails?.availabilityPeriods?.filter(
      (v, i, a) => a.findIndex((t) => t.timeStart === v.timeStart && t.timeEnd === v.timeEnd) === i,
    );
  }, [carDetails]);

  const [deleteCarAvailabilityPeriod] = useDeleteCarAvailabilityPeriodMutation();
  const [deleteCarAvailabilityPeriodChain] = useDeleteCarAvailabilityPeriodChainMutation();

  useEffect(() => {
    if (isEdit && carId) {
      getCarDetails({
        variables: {
          id: carId,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId, isEdit, showPopup]);

  useEffect(() => {
    if (car) {
      setCarDetails({
        ...car,
        details: {
          ...car.details,
          carMakerName: car.details.maker?.name,
          carMakerId: car.details.maker?.id,
          carModelName: car.details.model?.name,
          carModelId: car.details.model?.id,
          images: car?.details.images.map((i) => i.id),
        },
        availabilityPeriods: [...car.availabilityPeriods.map((a) => ({ ...a, carId: a.id }))],
        realLocation: {
          addressPrivate: car.addressPrivate,
          addressPublic: car.addressPublic,
          lon: car?.realLocation?.lon,
          lat: car?.realLocation?.lat,
        },
      });
    }
  }, [car, carData, setCarDetails]);

  useEffect(() => {
    setActiveNavStep && setActiveNavStep(2);
  }, [setActiveNavStep]);

  const eventsList = useMemo(() => {
    if (availabilityPeriods) {
      return availabilityPeriods.map((period: AddCarAvailabilityPeriodInputType) => {
        const { timeStart, timeEnd, allDayDate } = period;
        if (timeStart && timeEnd) {
          return {
            start: new Date(timeStart),
            end: new Date(
              differenceInSeconds(timeEnd, endOfDay(timeStart)) === 0
                ? sub(timeEnd, { seconds: 1 })
                : timeEnd,
            ),
            resource: period,
          } as Event;
        }
        if (allDayDate) {
          const allDay = new Date();
          return {
            start: startOfDay(allDay),
            end: sub(endOfDay(allDay), { seconds: 1 }),
            resource: period,
          };
        }
        return {
          start: undefined,
          end: undefined,
          resource: period,
        } as Event;
      });
    }
    return undefined;
  }, [availabilityPeriods]);

  const addEvent = (props: AddEventProps) => {
    const { end, start } = props as { end: Date; start: Date };

    if (isPast(start)) {
      showSnackbar({ message: 'You can only select future dates.', type: 'warning' });
      return;
    }
    try {
      const isEvenOverlapping =
        eventsList && eventsList.length
          ? eventsList.findIndex(
              (event) =>
                areIntervalsOverlapping(
                  { end, start },
                  { start: event?.start as Date, end: event?.end as Date },
                ) === true,
            )
          : -1;

      if (isEvenOverlapping === -1) {
        setNewEvent({
          carId: carId || carDetails?.id || '',
          timeStart: Date.parse(start.toString()),
          timeEnd: Date.parse(end.toString()),
        });
        setShowPopup(true);
      } else {
        showSnackbar({ message: 'Events can not overlap each others.', type: 'warning' });
      }
    } catch (err) {
      showSnackbar({ message: 'Events can not overlap each others.', type: 'warning' });
    }
  };

  const removeEvent = async (event: Event) => {
    try {
      setIsLoading && setIsLoading(true);
      if (!isBusiness || isEdit) {
        if (event.resource.chainId) {
          await deleteCarAvailabilityPeriodChain({
            variables: {
              chainId: event.resource.chainId,
            },
            refetchQueries: ['getCar'],
          });
        } else {
          await deleteCarAvailabilityPeriod({
            variables: {
              periodId: event.resource.id,
            },
            refetchQueries: ['getCar'],
          });
        }
      } else {
        setCarDetails({
          ...carDetails,
          details: {
            ...carDetails?.details,
          },
          availabilityPeriods: availabilityPeriods
            ?.filter((p) => p.timeStart !== event.resource.timeStart)
            .map((f) => ({ ...f, id: f.carId })),
        });
      }
      showSnackbar({ message: 'Car availability period deleted successfully.', type: 'success' });
    } catch (err) {
      showSnackbar({ message: 'Oops, something went wrong.', type: 'error' });
      logError(err);
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  const removeAllEvents = async () => {
    try {
      setIsLoading && setIsLoading(true);
      if (!isBusiness || isEdit) {
        const eventsToRemovePromises = eventsList?.map((event) =>
          deleteCarAvailabilityPeriod({
            variables: {
              periodId: event.resource.id,
            },
            refetchQueries: ['getCar'],
          }),
        );

        if (eventsToRemovePromises) {
          showSnackbar({ message: 'Events removal started.', type: 'info' });
          await Promise.all(eventsToRemovePromises);
        } else {
          showSnackbar({ message: 'Oops, no events to remove.', type: 'warning' });
        }
      } else {
        setCarDetails({
          ...carDetails,
          details: {
            ...carDetails?.details,
          },
          availabilityPeriods: [],
        });
      }

      showSnackbar({ message: 'Car availability periods deleted successfully.', type: 'success' });
    } catch (err) {
      showSnackbar({ message: 'Oops, something went wrong.', type: 'warning' });
      logError(err);
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  const TimeslotWrapper = useCallback(({ value, children }) => {
    return isPast(value) ? <div className="past-timeslot">{children}</div> : <>{children}</>;
  }, []);

  const Toolbar = (props: ToolbarProps) => {
    const { onNavigate, label } = props;
    const [isClearConfirmVisible, setIsClearConfirmVisible] = useState(false);
    return (
      <ToolbarWrapper>
        <ToolbarPart>
          <ToolbarNavigationWrapper>
            <ToolbarNavigation onClick={() => onNavigate('PREV')}>&lt;</ToolbarNavigation>
            <ToolbarNavigation onClick={() => onNavigate('NEXT')}>&gt;</ToolbarNavigation>
          </ToolbarNavigationWrapper>
          <ToolbarLabel>{label}</ToolbarLabel>
          <ToolbarNavigationWrapper>
            <ToolbarNavigation onClick={() => onNavigate('TODAY')}>Today</ToolbarNavigation>
          </ToolbarNavigationWrapper>
        </ToolbarPart>
        {eventsList?.length ? (
          <ToolbarPart>
            <ToolbarClear onClick={() => setIsClearConfirmVisible(true)}>
              Clear all availability
            </ToolbarClear>
            <Popup isOpen={isClearConfirmVisible} setIsOpen={() => setIsClearConfirmVisible(false)}>
              <div style={{ width: '500px', maxWidth: '100%', textAlign: 'center' }}>
                <BoldText style={{ fontSize: '30px', display: 'block' }}>
                  Clear all availability?
                </BoldText>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '40px',
                    width: '100%',
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsClearConfirmVisible(false);
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button onClick={removeAllEvents} variant="contained">
                    Clear availability
                  </Button>
                </div>
              </div>
            </Popup>
          </ToolbarPart>
        ) : null}
      </ToolbarWrapper>
    );
  };

  return (
    <AvailabilityCalendarWrapper>
      {title ? (
        <AvailabilityCalendarTitle>
          <Heading variant="h5">{title}</Heading>
        </AvailabilityCalendarTitle>
      ) : null}
      <Calendar
        components={{
          toolbar: Toolbar,
          timeSlotWrapper: TimeslotWrapper,
        }}
        defaultView="week"
        events={eventsList || []}
        formats={formats}
        localizer={localizer}
        onSelectEvent={(event) => removeEvent(event)}
        onSelectSlot={addEvent}
        selectable
        showMultiDayTimes
        step={15}
        timeslots={4}
        views={['week']}
      />
      {showPopup && newEvent && (
        <AddEventsDetailsPopup
          event={newEvent}
          eventsList={eventsList}
          isEdit={isEdit}
          setShowPopup={(v) => {
            if (carDetails) {
              refetchCarData({ id: carDetails.id });
            }
            setShowPopup(v);
          }}
          showPopup={showPopup}
        />
      )}
    </AvailabilityCalendarWrapper>
  );
};
export default AvailabilityCalendar;
