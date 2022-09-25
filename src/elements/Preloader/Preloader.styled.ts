import styled from 'styled-components';

const PreloaderWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;

  &:after {
    content: url('/images/icons/preloader.svg');
    width: 128px;
    height: 128px;
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(241, 242, 243);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default PreloaderWrapper;
