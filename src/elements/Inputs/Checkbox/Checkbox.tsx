import {
  DetailedHTMLProps,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  SetStateAction,
  ReactNode,
} from 'react';
import { CSSProperties } from 'styled-components';
import { FieldErrors } from 'react-hook-form';
import { Checkmark, CheckboxLabel, Error, StyledInput } from './Checkbox.styled';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode;
  handleChange?: Dispatch<SetStateAction<boolean>>;
  customStyles?: CSSProperties;
  errors?: FieldErrors;
  name: string;
}

type IInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  CheckboxProps &
  HTMLInputElement;

const Checkbox = forwardRef<IInputProps, CheckboxProps>(
  ({ label, name, errors, required, readOnly, customStyles, handleChange, ...rest }, ref) => {
    const fieldError = errors && errors[name];

    return (
      <div style={{ cursor: readOnly ? 'not-allowed' : 'auto' }}>
        <CheckboxLabel
          isError={Boolean(fieldError)}
          readOnly={readOnly}
          required={required}
          style={customStyles}
        >
          <StyledInput
            name={name}
            onChange={(e) => {
              handleChange && handleChange(e.target.checked);
              e.target.blur();
            }}
            ref={ref}
            type="checkbox"
            {...rest}
          />
          <span>{label}</span>
          <Checkmark />
        </CheckboxLabel>
        {required ? (
          <Error>{fieldError?.type === 'required' ? 'Required' : fieldError?.message}</Error>
        ) : null}
      </div>
    );
  },
);

export default Checkbox;
