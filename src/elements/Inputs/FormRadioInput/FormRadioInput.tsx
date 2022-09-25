import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import {
  Label,
  RadioOverlay,
  StyledRadio,
  RadioContent,
  IconContainer,
  UnmarkedCheckboxIcon,
} from './FormRadioInput.styled';
import { CheckboxIcon } from '../../../icons';
import { InputProps } from '../TextField/TextField';

export interface RadioInputProps extends InputProps {
  selected: boolean;
  variant?: string;
}

type IInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  RadioInputProps &
  HTMLInputElement;

const FormRadioInput = forwardRef<IInputProps, RadioInputProps>(
  ({ name, selected, value, variant, ...rest }: RadioInputProps, ref) => (
    <Label variant={variant}>
      <StyledRadio {...rest} name={name} ref={ref} type="radio" value={value} variant={variant} />
      <RadioOverlay />
      <RadioContent>
        <IconContainer>{selected ? <CheckboxIcon /> : <UnmarkedCheckboxIcon />}</IconContainer>
        {value}
      </RadioContent>
    </Label>
  ),
);

FormRadioInput.displayName = 'FormRadioInput';

export default FormRadioInput;
