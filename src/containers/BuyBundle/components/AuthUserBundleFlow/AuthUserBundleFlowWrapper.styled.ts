import styled from 'styled-components';
import { TabsBar } from '../../../../elements/Tabs/Tabs.styled';

const AuthUserBundleFlowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 560px;
  }

  > div {
    width: 525px;
    margin: 0 auto;
  }

  ${TabsBar} {
    margin-top: 0;
  }

  form {
    text-align: left;
  }

  > h2 {
    margin-bottom: 50px;
  }
`;

export default AuthUserBundleFlowWrapper;
