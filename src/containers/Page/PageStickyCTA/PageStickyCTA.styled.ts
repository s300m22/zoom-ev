import styled from 'styled-components';

interface CTAWrapper {
  color?: string;
}
export const CtaWrapper = styled.div<CTAWrapper>(
  ({ color }) => `
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: ${color};
      align-items:center;
      justify-content: center;
      padding: 15px;
      z-index: 999;
      box-shadow: -1px -3px 10px 4px rgb(0 0 0 / 15%);
      // button {
      //   width: 100%;
      // }
    `,
);

export default {};
