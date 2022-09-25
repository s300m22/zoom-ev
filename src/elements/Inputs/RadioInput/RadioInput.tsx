import { Dispatch, SetStateAction } from 'react';
import { Label, RadioOverlay, StyledRadio } from './RadioInput.styled';

export interface RadioInputProps {
  additionalLabel?: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: Dispatch<SetStateAction<string>>;
}

const RadioInput = ({ additionalLabel, name, value, checked, onChange }: RadioInputProps) => (
  <Label>
    <StyledRadio
      defaultChecked={checked}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      type="radio"
      value={value}
    />
    <RadioOverlay />
    <span>
      {value} {additionalLabel}
    </span>
  </Label>
);

export default RadioInput;
