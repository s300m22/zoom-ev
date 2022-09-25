import styled from 'styled-components';

interface RangeSliderInputProps {
  unit?: string;
}
export const RangeSliderInput = styled.div<RangeSliderInputProps>(
  ({ unit, theme }) => `
    display: flex;
    flex-direction: column;

    .input-range__slider {
      border: 3px solid #fff;
      height: 22px;
      width: 22px;
      border-radius: 50%;
      background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
      cursor: pointer;
      box-shadow: 0px 5px 10px rgba(23, 75, 83, 0.2);
    }

    .input-range__slider-container {
      top: -2px;
    }

    .label-container {
      background: ${theme.palette.primary};
      padding: 14px;
      border-radius: 4px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      text-align: center;
      position: absolute;
      top: -3.7rem;
      transform: translateX(-50%);
      margin-left: 7px;

      &::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid ${theme.palette.primary};
        bottom: -8px;
        left: calc(50% - 4px);
      }
      &::after {
        margin-left: 3px;
        content: ' ${unit || ''}';
      }
    }

    .dragger {
      height: 22px;
      width: 22px;
      border-radius: 20px;
      border: 3px solid white;
      box-shadow: 0px 5px 10px rgba(23, 75, 83, 0.2);
    }

    .min-max-values {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .input-range__label {
      font-size: 14px;
      color: ${theme.palette.gray};
      font-weight: 500;
      font-family: inherit;
    }

    .input-range__label--max,
    .input-range__label--min {
      margin-bottom: -15px;

      .input-range__label-container {
        left: 0;
      }
    }

    .input-range__label--max {
      right: 0;
    }

    .input-range__track--background {
      background: rgba(106, 112, 125, 0.08);
      box-shadow: inset 0px 2px 0px rgba(6, 16, 39, 0.05);
      border-radius: 12px;
      height: 16px;
    }

    .input-range__track--active {
      background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
      border-radius: 12px;
      height: 16px;
      border: 2px solid rgba(106, 112, 125, 0.08);
      border-right: none;
    }
  `,
);

export const Label = styled.label`
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: ${({ theme }) => theme.palette.primary};
  margin-bottom: 70px;
`;
