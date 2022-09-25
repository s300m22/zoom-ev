import styled from 'styled-components';

export type AvatarVariants = 'testimonial' | 'log';

interface AvatarWrapperProps {
  variant?: AvatarVariants;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  ${({ theme: { up, breakpoints }, variant }) =>
    `
      position: relative;
      line-height: 0;
      ${
        variant === 'testimonial'
          ? `
          margin: 5% auto;

          &:after {
            content: '';
            background: url('data:image/png;base64,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');
            background-size: cover;
            position: absolute;
            bottom: -5px;
            right: 2px;
            width: 42px;
            height: 42px;

            ${up(breakpoints.sm)} {
              width: 56px;
              height: 56px;
            }
          }
        `
          : ''
      }
      ${
        variant === 'log'
          ? `
            width: 40px;
            height: 40px;
            &:after {
              content: '';
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAzLTE1VDE0OjE3OjA2KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMy0xNVQxNjoxNDozNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMy0xNVQxNjoxNDozNCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOWE3YmVjYS02Mjg0LWU1NGYtYWZlZS01MDk0OTEyMTg0YmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDlhN2JlY2EtNjI4NC1lNTRmLWFmZWUtNTA5NDkxMjE4NGJlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDlhN2JlY2EtNjI4NC1lNTRmLWFmZWUtNTA5NDkxMjE4NGJlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowOWE3YmVjYS02Mjg0LWU1NGYtYWZlZS01MDk0OTEyMTg0YmUiIHN0RXZ0OndoZW49IjIwMjEtMDMtMTVUMTQ6MTc6MDYrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6YhitGAAAA20lEQVQYlTXLMU4CURQF0Pfu/QOJMTosQKIFNiYuwMqQ2LkA1+AOXIOhs3QbFlbTa2dhLVJgY8hA0Bnm866FoT/HL6sq/Q6HJ+ucHpuO503HMmd/Krv13UXMP/xq9j6qu/5L06FsM63JydpMazPro3YxRiefEFGSJkJGhAESXIfTNHhAKuwakOhbT5ARsuThoOTuZ6BrmRBOmgBphwqXA3GAhHij/y9CtkNA2J5tKvSa7W2CalIiwujhRFjhWp7G9z0Gn6vp/uJnXCieCVkPsepj+zrafN0cN/PZHy7EbGqjCpOaAAAAAElFTkSuQmCC');
              background-size: cover;
              position: absolute;
              bottom: 0;
              right: 0;
              width: 8px;
              height: 8px;
          }
        `
          : ''
      }
    `}

  img, svg {
    overflow: visible !important;
  }
`;

export default AvatarWrapper;
