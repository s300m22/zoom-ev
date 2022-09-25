import styled from 'styled-components';

const Error = styled.p`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
`;

export default Error;
