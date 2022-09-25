import styled from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { breakpoints, up } }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input {
      text-align: center;
      overflow: hidden;
      width: 9vmin !important;
      height: 15vmin !important;
      font-size: 18px;
      margin: 0 3px !important;
      -webkit-appearance: none;

      ${up(breakpoints.sm)} {
        width: 50px !important;
        height: 70px !important;
        font-size: 20px !important;
        margin: 0 5px !important;
      }
      
      &:nth-of-type(3) {
        margin-right: 5vmin !important;

        ${up(breakpoints.sm)} {
          margin-right: 30px !important;
        }
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: none !important;
        background-image: linear-gradient(white, white), linear-gradient(90deg, #54C0EF 0%, #16D3A4 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
        box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);

        @supports (-webkit-touch-callout: none) {
          background-image: none;
        }
      }
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  `,
);

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

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  height: 13px;
`;
