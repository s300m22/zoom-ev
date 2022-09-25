import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  30% {
    transform: rotate(10deg);
  }

  70% {
    transform: rotate(-10deg);
  }
`;

export const StarInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    margin-right: 5px !important;
  }
`;

export const StarRenderedContainer = styled.div`
  display: flex;

  svg {
    width: 30px;
    height: 30px;
  }

  &:hover {
    animation: ${rotate} 0.3s ease-in-out;
  }

  padding: 0;
  margin: 0;
  font-size: 1.2rem;
`;
