import styled from 'styled-components';
import { Container } from '../../../elements';
import { TabsSection } from '../../SectionLayouts/TabSectionLayout/TabSectionLayout.styled';

const Wrapper = styled(Container)(
  ({ theme: { breakpoints, up } }) => `
    margin-bottom: 30px;

    ${up(breakpoints.md)} {
      margin-bottom: 130px;
      ${TabsSection} {
        padding: 50px 0 0;
      }
    }
  `,
);

export default Wrapper;
