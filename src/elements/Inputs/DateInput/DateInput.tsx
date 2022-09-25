import { useMemo, InputHTMLAttributes } from 'react';
import DatePicker from 'react-datepicker';
import endOfToday from 'date-fns/endOfToday';
import isToday from 'date-fns/isToday';
import isSameDay from 'date-fns/isSameDay';
import add from 'date-fns/add';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { CSSProperties } from 'styled-components';
import {
  DateInputContainer,
  LabelInputWrapper,
  DayPickerInputWrapper,
  Error,
  Label,
  AlternativeLabel,
} from './DateInput.styled';
import { minimalAgeValidator } from '../../../utils';
import { CalendarIcon, CalendarMonoIcon } from '../../../icons';
import { useMediaDevice } from '../../../hooks';
import { Tooltip } from '../..';
import { getTimeSeries } from './DateInput.utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  maxWidth?: string;
  errors?: FieldErrors;
  name: string;
  customStyles?: CSSProperties;
  prefilledDate?: number | string | Date | null;
  control: Control<any>;
  minimalAge?: number;
  showClock?: boolean;
  readOnly?: boolean;
  alternative?: boolean;
  placeholderText?: string;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  endDate?: Date | null;
  startDate?: Date | null;
  filterDate?: (date: Date, isEnd?: boolean) => boolean;
  filterTime?: (date: Date) => boolean;
  tooltip?: string | null;
  showPicker?: boolean;
  showYearDropdown?: boolean;
  disabledPeriods?: { start: string; end: string }[];
  locale?: string;
}

const DateInput = ({
  errors,
  name,
  label,
  required = false,
  prefilledDate,
  customStyles,
  control,
  minimalAge,
  readOnly = false,
  showClock = false,
  alternative = false,
  placeholderText = 'DD/MM/YYYY',
  disablePastDates = true,
  disableFutureDates = false,
  endDate,
  startDate,
  filterDate,
  filterTime,
  tooltip = null,
  showPicker = true,
  showYearDropdown = false,
  disabledPeriods = [],
  locale,
}: InputProps) => {
  const { isMobile } = useMediaDevice();
  const formattedDate =
    typeof prefilledDate === 'string' || typeof prefilledDate === 'number'
      ? new Date(prefilledDate)
      : null;

  const FORMAT = showClock ? 'dd/MM/yyyy    hh:mm aa' : 'dd/MM/yyyy';
  const fieldError = errors && errors[name];

  const error = useMemo((): string | null => {
    if (!fieldError) {
      return null;
    }

    if (fieldError.type === 'required') {
      return 'Required';
    }

    return fieldError.message;
  }, [fieldError]);

  const sharedControllerInputProperties = {
    control,
    defaultValue: formattedDate,
    name,
  };

  const strikeThroughDatesAndTimes = useMemo<string[]>(() => {
    return disabledPeriods
      .map((dp) => getTimeSeries(new Date(dp.start), new Date(dp.end)))
      .reduce((ov, nv) => [...ov, ...nv], []);
  }, [disabledPeriods]);

  const renderDayContents = (day: number, date: Date) => {
    return (
      <span
        style={{
          textDecoration: strikeThroughDatesAndTimes.includes(date.toISOString())
            ? 'line-through'
            : 'none',
        }}
      >
        {day}
      </span>
    );
  };

  const timeClassName = (time: Date) => {
    return strikeThroughDatesAndTimes.includes(time.toISOString()) ? 'booked' : 'available';
  };

  const sharedInputProperites = (value: Date) => {
    return {
      renderDayContents,
      timeClassName,
      showYearDropdown,
      yearDropdownItemNumber: 16,
      scrollableYearDropdown: true,
      autoComplete: 'off',
      dateFormat: FORMAT,
      ...(endDate && {
        selectsStart: true,
        startDate: value,
        endDate,
      }),
      ...(startDate && {
        selectsEnd: true,
        endDate: value,
        startDate,
      }),
      ...(disablePastDates && {
        minDate: startDate || new Date(Date.now()),
        ...(isToday(value) &&
          !startDate && {
            minTime: new Date(Date.now()),
            maxTime: endOfToday(),
          }),
        ...(startDate &&
          isSameDay(startDate, value) && {
            minTime: add(startDate, { hours: 1 }),
            maxTime: endOfToday(),
          }),
      }),
      ...(disableFutureDates && {
        maxDate: endOfToday(),
      }),
      ...(filterDate && {
        filterDate: (date: Date) => filterDate(date, Boolean(startDate)),
      }),
      ...(filterTime && {
        filterTime,
      }),
      placeholderText,
      readOnly,
      showTimeSelect: isMobile ? false : showClock,
      showTimeInput: isMobile,
      timeFormat: 'hh:mm aa',
      selected: value || formattedDate,
      popperModifiers: {
        offset: {
          enabled: true,
          offset: '5px, 10px',
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: 'viewport',
          padding: {
            right: isMobile ? 0 : 250,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      },
      timeIntervals: 15,
      locale,
    };
  };
  if (alternative) {
    return (
      <DateInputContainer
        className="alternative__input"
        isError={Boolean(fieldError)}
        showPicker={showPicker}
        style={customStyles}
      >
        {showPicker && <CalendarIcon />}
        <LabelInputWrapper>
          {label && (
            <AlternativeLabel htmlFor={name} isError={Boolean(fieldError)} required={required}>
              {label}
            </AlternativeLabel>
          )}
          <Controller
            {...sharedControllerInputProperties}
            render={({ field }) => (
              // @ts-ignore
              <DatePicker {...field} {...sharedInputProperites(field.value)} />
            )}
            rules={{
              required,
              ...(minimalAge && { validate: (value) => minimalAgeValidator(value, minimalAge) }),
            }}
          />
        </LabelInputWrapper>
      </DateInputContainer>
    );
  }

  return (
    <DateInputContainer isError={Boolean(fieldError)} showPicker={showPicker} style={customStyles}>
      {label && (
        <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
          {label}
          {tooltip !== null && <Tooltip content={tooltip} />}
        </Label>
      )}
      <DayPickerInputWrapper>
        <Controller
          {...sharedControllerInputProperties}
          // @ts-ignore
          render={({ field }) => <DatePicker {...field} {...sharedInputProperites(field.value)} />}
          rules={{
            required,
            ...(minimalAge && { validate: (value) => minimalAgeValidator(value, minimalAge) }),
          }}
        />
        {showPicker && <CalendarMonoIcon />}
      </DayPickerInputWrapper>
      {error && <Error>{error}</Error>}
    </DateInputContainer>
  );
};

export default DateInput;
