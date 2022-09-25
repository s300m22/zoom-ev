import styled from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { up, breakpoints } }) => `
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
  
    > div {
      width: 100%;

      &:first-of-type {
        margin-bottom: 15px;
      }
    }
  
    ${up(breakpoints.sm)} {
      flex-wrap: nowrap;

      > div {
        width: 49%;

        &:first-of-type {
          margin-bottom: 0;
        }
      }
    }
  `,
);

const SocialButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 16px 30px;
  background: #fff;
  background-clip: padding-box;
  border: solid 1px transparent;
  border-radius: 72px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  width: 100%;

  :focus {
    outline: 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -1px;
    border-radius: inherit;
    background: linear-gradient(90deg, #ea4335 0%, #fbbc04 100%);
  }

  :hover,
  :active {
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 20px;
  }
`;

export const GoogleButton = styled(SocialButton)`
  &:before {
    background: linear-gradient(90deg, #ea4335 0%, #fbbc04 100%);
  }
`;

export const FacebookButton = styled(SocialButton)`
  &:before {
    background: linear-gradient(90deg, #1977f3 0%, #4595ff 100%);
  }
`;
