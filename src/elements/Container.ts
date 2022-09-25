import styled from 'styled-components';

interface ContainerProps {
  isWide?: boolean;
}

const Container = styled.div<ContainerProps>(
  ({ theme: { pageWidth, pageWidthWide }, isWide }) => `
  max-width: ${isWide ? pageWidthWide : pageWidth};
  width: 100%;
  margin: 0 auto;
`,
);

export default Container;
