/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  forwardRef,
  DetailedHTMLProps,
  useMemo,
  ReactNode,
} from 'react';
import { FieldErrors } from 'react-hook-form';
import { CSSProperties } from 'styled-components';
import Card from 'creditcards';
import {
  Label,
  StyledInput,
  Error,
  ShowPassword,
  SuggestedPrice,
  ShowCurrency,
} from './TextField.styled';
import InputContainer from '../InputContainer';
import EyeIcon from '../../../icons/EyeIcon';
import { ClosedEyeIcon } from '../../../icons';
import { formatPrice } from '../../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  handleChange?: Dispatch<SetStateAction<any>>;
  maxWidth?: string;
  errors?: FieldErrors;
  name: string;
  customStyles?: CSSProperties;
  creditCard?: boolean;
  suggestedPrice?: number;
  showCurrency?: boolean;
  readOnly?: boolean;
}

type IInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputProps &
  HTMLInputElement;

const TextField = forwardRef<IInputProps, InputProps>(
  (
    {
      errors,
      name,
      label,
      defaultValue,
      required,
      handleChange,
      maxWidth,
      customStyles,
      creditCard,
      suggestedPrice,
      showCurrency = false,
      readOnly,
      ...rest
    },
    ref,
  ) => {
    const [val, setVal] = useState(defaultValue || '');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const inputType = rest.type;
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

    const handlePasswordVisibility = (e: HTMLDivElement) => {
      const input = e.previousSibling as HTMLInputElement;
      setPasswordVisibility(!passwordVisibility);
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    };

    return (
      <InputContainer style={customStyles}>
        {label && (
          <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
            {label}
          </Label>
        )}
        <StyledInput
          defaultValue={val}
          id={name}
          isError={Boolean(fieldError)}
          maxWidth={maxWidth}
          min={0}
          name={name}
          onChange={(e) => {
            const newValue = creditCard ? Card.card.format(e.target.value) : e.target.value;
            setVal(newValue);
            handleChange && handleChange(newValue);
          }}
          readOnly={readOnly}
          ref={ref}
          required
          {...rest}
          style={{
            paddingRight: inputType === 'password' ? '46px' : '16px',
            paddingLeft: showCurrency ? '55px' : '16px',
          }}
        />
        {showCurrency && <ShowCurrency>£</ShowCurrency>}
        {inputType === 'password' && (
          <ShowPassword
            isReadOnly={Boolean(readOnly)}
            onClick={(e) => handlePasswordVisibility(e.currentTarget)}
          >
            {passwordVisibility ? <EyeIcon /> : <ClosedEyeIcon />}
          </ShowPassword>
        )}
        {suggestedPrice && (
          <SuggestedPrice isReadOnly={Boolean(readOnly)}>
            Suggested: {formatPrice(suggestedPrice)}
          </SuggestedPrice>
        )}
        <Error>{error}</Error>
      </InputContainer>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
