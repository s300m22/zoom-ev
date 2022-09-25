import styled from 'styled-components';

export const Wrapper = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  font-weight: 700;
  color: gray;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  font-family: Rubik;
  ${({ theme }) => `
        box-shadow: ${theme.palette.boxShadow};
        border-radius: 12px;
        z-index: 1;
      `};
  &:hover {
    color: black;
    cursor: pointer;
  }
  svg {
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
  }
`;
