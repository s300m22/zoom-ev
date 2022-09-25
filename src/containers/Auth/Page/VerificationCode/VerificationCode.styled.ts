import styled from 'styled-components';

export const Wrapper = styled.div`
  form {
    text-align: left;
    margin-bottom: 30px;
  }

  a {
    font-size: 14px;
  }
`;

export const EmailWrapper = styled.strong`
  word-break: break-all;
  display: block;
  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    display: inline-block;
  }
`;
