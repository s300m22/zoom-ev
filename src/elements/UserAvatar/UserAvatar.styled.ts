import styled from 'styled-components';

interface UserAvatarWrapperProps {
  variant?: string;
}

export const UserAvatarWrapper = styled.div<UserAvatarWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 12px;
  background: #f2f2f2;
  border: 4px solid #fff;
  border-radius: 50%;
  transition: 0.3s all;
  position: relative;

  &:hover {
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.2);
  }

  &:after {
    ${({ variant }) => (variant === 'log' ? "content: ''" : '')};
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAzLTE1VDE0OjE3OjA2KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMy0xNVQxNjoxNDozNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMy0xNVQxNjoxNDozNCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOWE3YmVjYS02Mjg0LWU1NGYtYWZlZS01MDk0OTEyMTg0YmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDlhN2JlY2EtNjI4NC1lNTRmLWFmZWUtNTA5NDkxMjE4NGJlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDlhN2JlY2EtNjI4NC1lNTRmLWFmZWUtNTA5NDkxMjE4NGJlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowOWE3YmVjYS02Mjg0LWU1NGYtYWZlZS01MDk0OTEyMTg0YmUiIHN0RXZ0OndoZW49IjIwMjEtMDMtMTVUMTQ6MTc6MDYrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6YhitGAAAA20lEQVQYlTXLMU4CURQF0Pfu/QOJMTosQKIFNiYuwMqQ2LkA1+AOXIOhs3QbFlbTa2dhLVJgY8hA0Bnm866FoT/HL6sq/Q6HJ+ucHpuO503HMmd/Krv13UXMP/xq9j6qu/5L06FsM63JydpMazPro3YxRiefEFGSJkJGhAESXIfTNHhAKuwakOhbT5ARsuThoOTuZ6BrmRBOmgBphwqXA3GAhHij/y9CtkNA2J5tKvSa7W2CalIiwujhRFjhWp7G9z0Gn6vp/uJnXCieCVkPsepj+zrafN0cN/PZHy7EbGqjCpOaAAAAAElFTkSuQmCC');
    background-size: cover;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
  }
`;

export const UserAvatarImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
