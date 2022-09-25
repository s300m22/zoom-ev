import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin: 30px 0;
  width: 100%;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background: #ececec;
  }

  span {
    background: #fff;
    padding: 0 30px;
    margin: 0 auto;
    color: ${({ theme }) => theme.palette.gray};
    font-size: 14px;
    z-index: 1;
  }
`;

export default Wrapper;
