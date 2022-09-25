import styled from 'styled-components';

const ContentBoxWrapper = styled.div`
  color: ${({ theme }) => theme.palette.gray};
  background: #f6f8fa99;
  padding: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 30px;
  }
`;

export default ContentBoxWrapper;
