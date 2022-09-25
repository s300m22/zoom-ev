import styled from 'styled-components';

export const RecentSearchesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 0;
  border-top: 1px solid ${({ theme }) => theme.palette.lightText};
  margin-top: 10px;
`;

export const RecentSearchesItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  line-height: 150%;
  font-size: 14px;
  font-weight: 500;
  display: block;
  color: ${({ theme }) => theme.palette.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.palette.hover};
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`;

export const RecentSearchesTitle = styled.p`
  font-size: 14px;
  line-height: 14px;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.palette.gray};
`;
