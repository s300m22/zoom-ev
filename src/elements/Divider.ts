import styled from 'styled-components';

interface DividerProps {
  color?: string;
}

const Divider = styled.hr<DividerProps>`
  width: 100%;
  margin: 15px 0;
  border-top: 1px solid ${({ color, theme }) => color || theme.palette.gray};
  opacity: 0.3;
`;

export default Divider;
