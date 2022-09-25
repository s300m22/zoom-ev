import countryCodes from 'country-codes-list';
import { CSSProperties, DetailedHTMLProps, forwardRef, InputHTMLAttributes, useMemo } from 'react';
import TextField from '../TextField';
import { InputProps } from '../TextField/TextField';
import Select from '../Select';
import { FieldsWrapper, InputWrapper, Label, SelectWrapper } from './PhoneInput.styled';
import InputContainer from '../InputContainer';

export interface PhoneInputProps extends InputProps {
  selectedCallingCode: string;
  setSelectedCallingCode: (countryCallingCode: string) => void;
  customStyles?: CSSProperties;
}

type IPhoneInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  PhoneInputProps &
  HTMLInputElement;

interface CountryItem {
  countryCallingCode: string;
  countryNameEn: string;
  flag: string;
  countryCode: string;
}

const PhoneInput = forwardRef<IPhoneInputProps, PhoneInputProps>(
  (
    {
      label = 'Telephone',
      selectedCallingCode,
      setSelectedCallingCode,
      customStyles,
      required,
      name,
      errors,
      ...rest
    }: PhoneInputProps,
    ref,
  ) => {
    const countriesDetails = useMemo(() => {
      const details = countryCodes.customArray({
        countryCallingCode: '{countryCallingCode}',
        countryNameEn: '{countryNameEn}',
        flag: '{flag}',
        countryCode: '{countryCode}',
      }) as Array<CountryItem>;

      return details.sort((a, b) => a.countryNameEn.localeCompare(b.countryNameEn));
    }, []);

    const fieldError = errors && errors[name];

    return (
      <InputContainer>
        <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
          {label}
        </Label>
        <FieldsWrapper>
          <SelectWrapper>
            <Select
              onChange={(value) => setSelectedCallingCode(value)}
              showSelectedAsValue
              showSelectedAsValueDecorator={(value) => `+${value}`}
              value={selectedCallingCode}
            >
              {countriesDetails.map(({ countryNameEn, flag, countryCallingCode, countryCode }) => (
                <div data-value={countryCallingCode} key={countryCode}>
                  {flag}&emsp;
                  {countryNameEn} +{countryCallingCode}
                </div>
              ))}
            </Select>
          </SelectWrapper>
          <InputWrapper>
            <TextField
              errors={errors}
              name={name}
              ref={ref}
              type="phone"
              {...rest}
              customStyles={customStyles}
            />
          </InputWrapper>
        </FieldsWrapper>
      </InputContainer>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
