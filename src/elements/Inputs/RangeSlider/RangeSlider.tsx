import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { getTrackBackground, Range } from 'react-range';
import { Label, RangeSliderInput } from './RangeSlider.styled';
import { formatPrice } from '../../../utils';

export interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  label: string;
  unit?: string;
  initValue?: number;
  labelPriceFormat?: boolean;
  onChange: Dispatch<SetStateAction<number>>;
}
const RangeSlider = ({
  minValue,
  maxValue,
  label,
  unit,
  initValue = 0,
  onChange,
  labelPriceFormat = false,
}: RangeSliderProps) => {
  const [min] = useState(minValue);
  const [max] = useState(maxValue);
  const [val, setVal] = useState(initValue >= min ? initValue : min || 0);

  useEffect(() => {
    onChange(val);
  }, [val, onChange]);

  return (
    <RangeSliderInput unit={unit}>
      <Label>{label}</Label>

      <Range
        max={max}
        min={min}
        onChange={(value) => setVal(value[0] as number)}
        renderThumb={({ props, isDragged }) => (
          <div {...props}>
            <div className="label-container">
              {labelPriceFormat
                ? `${formatPrice(val)}`
                : `${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}{' '}
            </div>
            <div
              className="dragger"
              style={{
                backgroundColor: isDragged ? '#54c0ef' : '#16d3a4',
              }}
            />
          </div>
        )}
        renderTrack={({ props, children }) => (
          <div>
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '60px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '16px',
                  width: '100%',
                  borderRadius: '30px',
                  boxShadow: 'inset 0px 2px 0px rgb(6 16 39 / 5%)',
                  background: getTrackBackground({
                    values: [val],
                    colors: ['#54c0ef 0%, #16d3a4', 'rgba(106,112,125,0.08)'],
                    min,
                    max,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
            <div className="min-max-values">
              <span className="input-range__label">{min}</span>
              <span className="input-range__label">{max}</span>
            </div>
          </div>
        )}
        step={0.1}
        values={[val]}
      />
    </RangeSliderInput>
  );
};

export default RangeSlider;
