import styled from 'styled-components';

const AgreementsWrapper = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  margin: 30px 0 50px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 30px 0 90px;
  }
`;

export default AgreementsWrapper;
