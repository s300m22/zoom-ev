import { ReactNode, useMemo } from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { StarInputWrapper, StarRenderedContainer } from './StarInput.styled';
import { Error } from '../Inputs';

const StarInputPicker = dynamic(
  () => {
    return import('react-star-picker');
  },
  { ssr: false },
);

export interface StarInputProps {
  name: string;
  control: Control<any>;
  required?: boolean;
  errors?: FieldErrors;
  disabled?: boolean;
  defaultValue?: number | null;
}

interface StarRendererProps {
  index: number;
  hoverIndex: number;
  selectedIndex: number;
}

const StarRenderer = ({ index, hoverIndex, selectedIndex }: StarRendererProps): ReactNode => {
  const selected = index <= selectedIndex;
  const inHoverRange = hoverIndex != null && index <= hoverIndex;
  const hoverActive = hoverIndex != null;

  const colored = (selected && !hoverActive) || (inHoverRange && hoverActive);
  const color = colored ? 'url(#paint0_linear)' : 'transparent';
  const colorOutline = colored ? 'transparent' : '#4D6A707D';
  return (
    <StarRenderedContainer>
      <svg
        fill="none"
        height="16"
        viewBox="0 0 17 16"
        width="17"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.146 5.057l-4.317-.628L8.902.518a1.041 1.041 0 00-1.8 0L5.175 4.43l-4.317.627a1 1 0 00-.556 1.706l3.123 3.045-.737 4.3a1 1 0 001.451 1.054l3.863-2.031 3.861 2.029a1 1 0 001.451-1.054l-.737-4.3 3.125-3.043a1 1 0 00-.554-1.705l-.002-.001z"
          fill={color}
          stroke={colorOutline}
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear"
            x1="0.711"
            x2="19.166"
            y1="15.293"
            y2="7.23"
          >
            <stop stopColor="#54EFD0" />
            <stop offset="1" stopColor="#00BFF3" />
          </linearGradient>
        </defs>
      </svg>
    </StarRenderedContainer>
  );
};

const StarInput = ({
  name,
  control,
  errors,
  disabled = false,
  defaultValue = null,
  required,
}: StarInputProps) => {
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
    <>
      <StarInputWrapper>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field }) => (
            <StarInputPicker
              {...field}
              disabled={disabled}
              doubleTapResets
              halfStars={false}
              numberStars={5}
              size={30}
              starRenderer={StarRenderer}
            />
          )}
          rules={{ required }}
        />
        <Error>{error}</Error>
      </StarInputWrapper>
    </>
  );
};
export default StarInput;
