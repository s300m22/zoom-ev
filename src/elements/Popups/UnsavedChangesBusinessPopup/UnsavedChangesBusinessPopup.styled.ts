import styled from 'styled-components';

export const UnsavedChangesBusinessPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 544px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 80px;
  }

  button {
    width: 100%;
    margin-bottom: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-bottom: 0;
      width: auto;

      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
`;

export const Paragraph = styled.p`
  margin: 30px 0 20px;
  color: ${({ theme }) => theme.palette.gray};

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 30px 0 -40px;
  }
`;
