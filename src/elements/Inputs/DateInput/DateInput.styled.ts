import styled from 'styled-components';
import InputContainer from '../InputContainer';

interface DateInputContainerProps {
  isError: boolean;
  showPicker: boolean;
}

export const DateInputContainer = styled(InputContainer)<DateInputContainerProps>`
  display: flex;

  > div {
    width: 100%;
  }

  input {
    padding: 16px;
    background: ${({ theme: { palette } }) => palette.secondary};
    color: ${({ theme: { palette } }) => palette.primary};
    border: 1px solid ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
    box-sizing: border-box;
    border-radius: 12px;
    outline: none;
    width: 100%;

    -webkit-appearance: none;
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      box-shadow: 0 0 0 30px white inset !important;
    }

    :read-only {
      background: #f2f2f2;
      cursor: not-allowed;
    }
  }

  &.alternative__input {
    flex-direction: row;
    align-items: center;
    padding: 18px 15px 12px;

    input {
      padding: 9px 14px;
      background: ${({ theme: { palette } }) => palette.secondary};
      border: none;
      -webkit-appearance: none;
      font-weight: 500;
    }
  }

  .react-datepicker-popper {
    z-index: 3;

    ${({ showPicker }) => (showPicker ? '' : 'display: none!important;')}
  }

  .react-datepicker {
    border-radius: 16px;
    box-shadow: 0px 10px 24px rgba(6, 35, 112, 0.05);
    border: 1px solid #f2f2f2;
    padding: 30px;
    font-family: inherit;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      flex-wrap: nowrap;
    }

    &__input-time-container {
      text-align: center;
      margin: 20px auto 0;
    }

    .react-datepicker__time-list {
      max-height: 215px;

      ::-webkit-scrollbar {
        width: 4px;
        border-radius: 12px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: ${({ theme: { palette } }) => palette.lightGray};
        border-radius: 2px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }

    .react-datepicker__time {
      width: auto !important;
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected {
      background-color: #f2f2f2;
      color: ${({ theme: { palette } }) => palette.gray};
      font-weight: 400;
    }

    ul.react-datepicker__time-list {
      padding: 10px;
      box-sizing: border-box !important;
    }

    .react-datepicker__time-list-item {
      height: 34px;
      padding: 5px 10px;
    }
    .react-datepicker__time-container {
      font-size: 16px;
      color: ${({ theme: { palette } }) => palette.gray};
      border: 0;
      position: absolute;
      right: -237px;
      border-radius: 16px;
      box-shadow: 0px 10px 24px rgba(6, 35, 112, 0.05);
      width: 227px;
      text-align: left;

      .react-datepicker__time-box {
        width: 100%;
        border-radius: 16px;
        box-shadow: 0px 10px 24px rgba(6, 35, 112, 0.05);
      }

      .react-datepicker__header--time {
        display: none;
      }

      .booked {
        text-decoration: line-through;
      }
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation {
    height: 12px;
    width: 7px;
    border: none;
    background-size: 100%;
    top: 30px;

    &--previous {
      left: initial;
      right: 45px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAYAAACulacQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB/SURBVHgBdZDdDUVAEIXPzN1CbgtKUIJ4FrYCStDJRvC8JVCKDnhG/GyIYO15mWS+L5OZIXxEVTpj5p4sUOp8LzFm+OQCUgYduYDpkQuYCFXrBCtSTPDuwIQxot3hALEk7+WOsUr/IdAASyGjMH9Al/A85SXYTzgF/rENLwEYNj9LPbQsoYxbAAAAAElFTkSuQmCC');
    }

    &--next {
      right: 30px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAYAAACulacQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABxSURBVHgBpY69DYAgGETPHwjlZ0FPpYzjCIzgCG7gSjqBI7iAhSWJUYTCQsXCeO27ezlwKuucdItIsk1Im8N1iZDFbuf+WSGtOFXTm+F7IYkVGNwIuCa9Mw4Yv1hWpMMVeF3QhvVPwEibKDjfgRQhkgNpkx9CbuF3XgAAAABJRU5ErkJggg==');
    }
  }

  .react-datepicker__header {
    background-color: transparent;
    padding-top: 0;
    border-bottom: none;
  }

  .react-datepicker__current-month {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
    color: ${({ theme: { palette } }) => palette.dark};
    text-align: left;
  }

  .react-datepicker__day-name {
    color: ${({ theme: { palette } }) => palette.dark};
    font-size: 14px;
    line-height: 21px;
  }

  .react-datepicker__day {
    color: ${({ theme: { palette } }) => palette.primary};
    border-right: 1px solid #f2f2f2;
    border-radius: 0;
    font-size: 14px;

    &:last-of-type {
      border-right: none;
    }

    &--disabled {
      color: ${({ theme: { palette } }) => palette.lightGray};
      font-weight: 300;
      cursor: not-allowed;
    }

    &--selected {
      color: ${({ theme: { palette } }) => palette.secondary} !important;
      background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%) !important;
      font-weight: 600;
      border: none;
      border-radius: 0;
    }

    &--today {
      background-color: transparent;
      color: ${({ theme: { palette } }) => palette.blue};
    }

    &--in-range {
      color: ${({ theme: { palette } }) => palette.secondary};
      background: ${({ theme: { palette } }) => palette.blue}!important;
    }
  }

  .react-datepicker__week {
    border-left: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;

    &:last-of-type {
      border-bottom: 1px solid #f2f2f2;
    }
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 7);
    margin: 0;
    padding: 10px 9px;
    line-height: 100%;
  }

  .react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--scroll {
    width: 100%;
    margin-top: -5px;
    .react-datepicker__year-read-view {
      border: 1px solid #dbdbdb;
      padding: 6px;

      span.react-datepicker__year-read-view--down-arrow {
        top: 5px;
        border-width: 0.3rem;
        width: 0;
      }
    }
    .react-datepicker__year-dropdown {
      width: 100%;
      left: 0;
      background-color: white;
      .react-datepicker__year-option {
        padding: 4px;
        font-size: 16px;
        color: gray;
        &:hover {
          background-color: white;
          color: black;
        }
      }
    }
  }
`;

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-size: 16px;
  line-height: 150%;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};
  margin-bottom: 10px;

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;
export const AlternativeLabel = styled.label<LabelProps>`
  font-size: 14px;
  line-height: 14px;
  margin: 0 0 0 15px;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.gray)};

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;
`;

export const DayPickerInputWrapper = styled.div`
  position: relative;

  > div {
    width: 100%;
  }

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
