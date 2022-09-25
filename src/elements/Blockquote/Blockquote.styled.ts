import styled from 'styled-components';

const Wrapper = styled.blockquote`
  display: flex;
  flex-direction: column;
  color: #2d3748;
  line-height: 36px;
  margin: 0;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 0 0 0 25px;
  }

  span {
    word-break: break-word;
  }

  b {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.primary};
    line-height: 21px;
    display: block;
    margin-top: 25px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin-top: 0;
    }
  }

  code {
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.palette.gray};
    display: block;
  }
`;

export default Wrapper;
