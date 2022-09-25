import styled from 'styled-components';

export const CarSearchBarForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ececec;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    flex-wrap: nowrap;
    padding: 0 15px;
    justify-content: flex-start;
  }
`;

export const LocationInputWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #ececec;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 35%;
    border-right: 1px solid #ececec;
    border-bottom: none;
  }
`;

export const PickUpInputWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #ececec;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 50%;
    border-right: 1px solid #ececec;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    border-bottom: none;
    width: 34.5%;
    padding-left: 20px;
  }
`;

export const DropOffWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #ececec;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 50%;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    border-bottom: none;
    width: 34.5%;
    padding-left: 20px;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  background: none repeat scroll 0 0 transparent;
  border: medium none;
  border-spacing: 0;
  list-style: none outside none;
  padding: 0;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  cursor: pointer;
  outline: none;
  margin: 15px auto;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 6%;
    margin: 0;
  }
`;
