import {
  useState,
  useMemo,
  forwardRef,
  useEffect,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from 'react';
import dynamic from 'next/dynamic';
import { ReactCodeInputProps } from 'react-code-input';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Error, Label, Wrapper } from './CodeInput.styled';

const ReactCodeInput = dynamic(import('react-code-input'));

const inputStyles = {
  inputStyle: {
    borderRadius: '16px',
    border: '1px solid #ececec',
    margin: '0 5px',
    fontWeight: 700,
  },
};

interface CodeInputProps extends ReactCodeInputProps {
  label?: string;
  errors?: FieldErrors;
  required?: boolean;
  setCodeValue?: UseFormSetValue<any>;
}

type IInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  CodeInputProps &
  HTMLInputElement;

const CodeInput = forwardRef<IInputProps, CodeInputProps>(
  ({ fields, inputMode, name, type, errors, label, required, setCodeValue }, ref) => {
    const [inputValue, setInputValue] = useState('');
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

    useEffect(() => {
      setCodeValue && setCodeValue(name, inputValue);
    }, [inputValue, name, setCodeValue]);

    return (
      <Wrapper>
        {label && (
          <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
            {label}
          </Label>
        )}
        {/* Hidden input to store value in react-hook-form state */}
        <input name={name} ref={ref} type="hidden" />
        <ReactCodeInput
          fields={fields}
          inputMode={inputMode}
          name="codeInput"
          type={type}
          {...inputStyles}
          onChange={(val) => setInputValue(val)}
        />
        <Error>{error}</Error>
      </Wrapper>
    );
  },
);
export default CodeInput;
