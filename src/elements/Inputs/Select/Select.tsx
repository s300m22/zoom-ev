import {
  Children,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Label, StyledSelect, SelectList, SelectListItem, SelectContainer } from './Select.styled';
import InputContainer from '../InputContainer';
import { useHotkeys, useOnClickOutside } from '../../../hooks';
import { SelectArrowsIcon } from '../../../icons';

export interface SelectProps {
  children?: ReactNode;
  label?: string;
  name?: string;
  value?: string;
  onChange?: (event: string) => void;
  showSelectedAsValue?: boolean;
  showSelectedAsValueDecorator?: (value: string) => string;
  tooltip?: ReactNode;
}

interface Option {
  ['data-value']: string;
  label: string;
}

interface AllOptions {
  [value: string]: Option;
}

const convertArrayToObjectOptions = (
  array: Array<Option>,
  key: 'data-value' | 'label',
): AllOptions => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const Select = ({
  children,
  label,
  name,
  value,
  onChange,
  showSelectedAsValue = false,
  showSelectedAsValueDecorator,
  tooltip,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectContainerRef = useRef(null);

  const allOptions = useMemo((): AllOptions | undefined => {
    const allOptionsArray = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return {
          'data-value': child.props.value || child.props['data-value'],
          label: child.props.children,
        };
      }
      return undefined;
    }) as Array<Option>;

    return allOptionsArray?.length
      ? convertArrayToObjectOptions(allOptionsArray, 'data-value')
      : undefined;
  }, [children]);

  const firstChildValue = useMemo((): string | undefined => {
    const arr = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return child.props['data-value'];
      }
      return undefined;
    });
    return arr?.length && arr[0] ? arr[0] : undefined;
  }, [children]);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    value || firstChildValue,
  );

  useEffect(() => {
    setSelectedOption(value || firstChildValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const selectedLabel = useMemo(() => {
    if (!selectedOption || !allOptions) {
      return '';
    }

    if (showSelectedAsValue) {
      if (showSelectedAsValueDecorator) {
        return showSelectedAsValueDecorator(allOptions[selectedOption]['data-value']);
      }
      return allOptions[selectedOption]['data-value'];
    }
    return allOptions[selectedOption]?.label;
  }, [allOptions, selectedOption, showSelectedAsValue, showSelectedAsValueDecorator]);

  const closeOptionsList = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOptionClick = useCallback(
    (selectedOptionValue: string) => {
      onChange && onChange(selectedOptionValue);
      setSelectedOption(selectedOptionValue);
      closeOptionsList();
    },
    [onChange, closeOptionsList],
  );

  useHotkeys('Escape', closeOptionsList);

  useOnClickOutside(selectContainerRef, closeOptionsList);

  return (
    <InputContainer>
      {label && (
        <Label htmlFor={name}>
          {label} {tooltip}
        </Label>
      )}
      <SelectContainer ref={selectContainerRef}>
        <StyledSelect
          data-name={name}
          id={name}
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedLabel}
          <SelectArrowsIcon />
        </StyledSelect>
        {isOpen && (
          <SelectList>
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                const { 'data-value': itemValue } = child.props;
                return (
                  <SelectListItem
                    onClick={() => onOptionClick(itemValue)}
                    selected={itemValue.toString() === selectedOption?.toString()}
                  >
                    {child}
                  </SelectListItem>
                );
              }
              return null;
            })}
          </SelectList>
        )}
      </SelectContainer>
    </InputContainer>
  );
};

export default Select;
