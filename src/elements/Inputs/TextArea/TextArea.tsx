import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import { FieldErrors } from 'react-hook-form';
import { CSSProperties } from 'styled-components';
import { TextAreaCounter, StyledTextArea, TextAreaWrapper } from './TextArea.styled';
import { Error, Label } from '../TextField/TextField.styled';
import InputContainer from '../InputContainer';
import { Tooltip } from '../../index';

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxWidth?: string;
  errors?: FieldErrors;
  name: string;
  noResize?: boolean;
  maxLength?: number;
  customStyles?: CSSProperties;
  readOnly?: boolean;
  hideCounter?: boolean;
  tooltip?: string;
}

type ITextAreaProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  TextAreaProps &
  HTMLInputElement;

const TextArea = forwardRef<ITextAreaProps, TextAreaProps>(
  (
    {
      noResize,
      errors,
      name,
      label,
      defaultValue,
      required,
      maxWidth = 'none',
      maxLength,
      hideCounter = false,
      readOnly,
      tooltip,
      ...rest
    },
    ref,
  ) => {
    const [val, setVal] = useState(defaultValue || '');
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

    return (
      <InputContainer style={{ maxWidth }}>
        {label && (
          <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
            {label}
            {tooltip && <Tooltip content={tooltip} />}
          </Label>
        )}
        <TextAreaWrapper>
          <StyledTextArea
            defaultValue={val}
            id={name}
            isError={Boolean(fieldError)}
            isReadOnly={Boolean(readOnly)}
            maxLength={maxLength}
            maxWidth={maxWidth}
            name={name}
            noResize={noResize}
            onChange={(e) => {
              const newValue = e.target.value;
              setVal(newValue);
            }}
            readOnly={readOnly}
            ref={ref}
            required
            {...rest}
          />
          {maxLength && !hideCounter && typeof val === 'string' ? (
            <TextAreaCounter>{maxLength - val.length}</TextAreaCounter>
          ) : null}
        </TextAreaWrapper>
        <Error>{error}</Error>
      </InputContainer>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
