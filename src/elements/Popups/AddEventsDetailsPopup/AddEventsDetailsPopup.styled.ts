import styled from 'styled-components';

export const EventsDetailsPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 565px;
    padding: 20px 0;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 227px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  button {
    width: 100%;
    margin-bottom: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-bottom: 0;

      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
`;

export const Paragraph = styled.p`
  margin: 10px 0 30px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;
`;
