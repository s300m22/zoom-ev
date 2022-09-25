import styled from 'styled-components';
import { InputContainer } from '..';
import { CreditCardWrapper } from '../../CreditCard/CreditCard.styled';

interface CreatableSelectWrapperProps {
  isError: boolean;
}

const CreatableSelectWrapper = styled(InputContainer)<CreatableSelectWrapperProps>`
  display: flex;

  div[class*='-container'] {
    * {
      color: ${({ theme: { palette } }) => palette.primary};
    }
  }

  div[class*='-control'] {
    ${CreditCardWrapper} {
      svg {
        margin-right: 15px;
        margin-left: 15px;
      }
    }
  }

  div[class*='-MenuList'] {
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

  div[class*='-indicatorContainer'] {
    svg {
      fill: none;

      path {
        stroke: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};
      }
    }
  }

  div[class*='-placeholder'] {
    color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};
  }
`;

export default CreatableSelectWrapper;
