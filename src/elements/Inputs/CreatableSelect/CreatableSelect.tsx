import { useMemo, ReactNode } from 'react';
import CreatableSelectComponent from 'react-select/creatable';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { CSSProperties } from 'styled-components';
import { components } from 'react-select';
import CreatableSelectWrapper from './CreatableSelect.styled';
import { useTheme } from '../../../hooks';
import { SelectArrowsIcon } from '../../../icons';
import { CreditCard, Label, Error } from '../..';

export interface CreatableSelectProps {
  label?: string;
  tooltip?: ReactNode;
  name: string;
  options: any;
  control: Control<any>;
  required?: boolean;
  errors?: FieldErrors;
  readOnly?: boolean;
  defaultValue?: {
    value: string | number | null;
    label: string | number | null;
  } | null;
  isCreatable?: boolean;
  isCardsSelector?: boolean;
}

const CreatableSelect = ({
  label,
  tooltip,
  name,
  options,
  control,
  required = true,
  errors,
  readOnly = false,
  defaultValue = null,
  isCreatable = true,
  isCardsSelector = false,
}: CreatableSelectProps) => {
  const theme = useTheme();
  const fieldError = errors && errors[name];
  const { Option, DropdownIndicator, Control: SelectControl } = components;
  const error = useMemo((): string | null => {
    if (!fieldError) {
      return null;
    }

    if (fieldError.type === 'required') {
      return 'Required';
    }

    return fieldError.message;
  }, [fieldError]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomDropdownIndicator = (props: any) => (
    <DropdownIndicator {...props}>
      <SelectArrowsIcon fill={error ? theme.palette.error : theme.palette.lightText} />
    </DropdownIndicator>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomOption = (props: any) => {
    const { data } = props;
    return (
      <Option {...props}>
        <CreditCard paymentMethod={data.paymentMethod} />
      </Option>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomValueContainer = (props: any) => {
    const { children, getValue } = props;
    const values = getValue();
    const paymentMethod = values.length && values[0].paymentMethod;
    return (
      <SelectControl {...props}>
        <CreditCard paymentMethod={paymentMethod} showNumber={false} />
        {children}
      </SelectControl>
    );
  };

  return (
    <CreatableSelectWrapper isError={Boolean(fieldError)}>
      {label && (
        <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
          {label} {tooltip}
        </Label>
      )}
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => (
          <CreatableSelectComponent
            components={{
              DropdownIndicator: CustomDropdownIndicator,
              ...(isCardsSelector && { Option: CustomOption }),
              ...(isCardsSelector && { Control: CustomValueContainer }),
            }}
            isClearable
            isDisabled={readOnly}
            onChange={onChange}
            options={options}
            value={value}
            {...(!isCreatable && { isValidNewOption: () => false })}
            styles={{
              // @ts-expect-error not really sure what the issue here is its not clear
              control: (styles: CSSProperties) => ({
                ...styles,
                width: '100%',
                minWidth: '100px',
                padding: '9px 5px',
                border: `1px solid ${
                  error ? theme.palette.error : theme.palette.lightText
                } !important`,
                outline: 'none',
                fontStyle: 'normal',
                fontWeight: 'normal',
                // color: theme.palette.primary,
                fontSize: '16px',
                lineHeight: '150%',
                position: 'relative',
                borderRadius: '12px',
                boxShadow: 'none',
                cursor: readOnly ? 'not-allowed' : 'pointer',
                pointerEvents: 'auto',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              // @ts-expect-error not really sure what the issue here is its not clear
              dropdownIndicator: (styles: CSSProperties) => ({
                ...styles,
                color: `${error ? theme.palette.error : theme.palette.lightText}`,
              }),
              // @ts-expect-error not really sure what the issue here is its not clear

              option: (
                styles: CSSProperties,
                { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean },
              ) => ({
                ...styles,
                cursor: 'pointer',
                width: '100%',
                padding: '10px 20px',
                lineHeight: '150%',
                fontSize: '16px',
                color: isSelected ? theme.palette.hover : theme.palette.primary,
                background: isFocused ? theme.palette.action.hover : 'transparent',
              }),
            }}
          />
        )}
        rules={{ required }}
      />
      <Error>{error}</Error>
    </CreatableSelectWrapper>
  );
};

export default CreatableSelect;
