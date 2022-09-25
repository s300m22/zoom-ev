import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${({ theme: { palette } }) => palette.lightText};
  height: 84px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-radius: 12px;
`;

export const Icon = styled.a`
  cursor: pointer;
`;

export const SocialIcons = styled.div`
  display: flex;
  ${Icon}:not(:last-of-type) {
    margin-right: 30px;
  }
`;
