import styled from 'styled-components';

export const Card = styled.div(
  ({ theme: { down, breakpoints, palette } }) => `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;
  max-width: 352px;
  background: ${palette.secondary};
  box-shadow: ${palette.boxShadow};
  border-radius: 12px;
  z-index: 1;

  ${down(breakpoints.md)} {
    width: 75%;
    max-width: unset;
  }

  ${down(breakpoints.sm)} {
    width: 100%;
  }
`,
);

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 81px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px;

  ${InputContainer}:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

export const SummaryParagraph = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #6a707d;
`;

export const SummaryItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const Summary = styled.div`
  display: flex;
  background: rgba(240, 244, 247, 0.6);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-sizing: border-box;
  width: 100%;
  height: 148px;

  ${SummaryItem}:first-child {
    border-top: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
  }
`;

export const SummaryPrice = styled.p`
  font-weight: bold;
  font-size: 30px;
  line-height: 120%;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 30px;
`;
