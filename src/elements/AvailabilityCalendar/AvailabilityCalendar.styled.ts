import styled from 'styled-components';
import { SimpleCardWrapper } from '../SimpleCard/SimpleCard.styled';

export const AvailabilityCalendarWrapper = styled(SimpleCardWrapper)`
  display: flex;
  width: 100%;

  .rbc-calendar {
    min-height: 500px;

    .rbc-time-content > * + * > * {
      border-left: 1px solid #ececec;
    }

    .rbc-time-view {
      border: 0;
    }

    .rbc-allday-cell {
      height: 0;
      pointer-events: none;
    }

    .rbc-header {
      border-bottom: 0;
      padding: 20px 15px;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      color: ${({ theme }) => theme.palette.dark};

      + .rbc-header {
        border-left: 1px solid #ececec;
      }
    }

    .rbc-time-content {
      border-top: 0;
      border-right: 1px solid #ececec;
    }

    .rbc-time-header-gutter {
      visibility: hidden;
    }

    .rbc-time-header-cell {
      min-height: unset;
      border-bottom: 1px solid #ececec;
    }

    .rbc-time-header-content {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-top: 1px solid #ececec;
      border-left: 1px solid #ececec;
      border-right: 1px solid #ececec;
      border-bottom: 0;
    }

    .rbc-time-gutter .rbc-timeslot-group {
      border-bottom: 0;
      font-size: 12px;
      color: ${({ theme }) => theme.palette.grayMiddle};
      font-weight: 500;
    }

    .rbc-day-slot .rbc-timeslot-group {
      border-bottom: 1px solid #ececec;
      opacity: 0.5;
      display: flex;
      align-items: stretch;

      :last-of-type {
        border-bottom-right-radius: 12px;
      }
    }

    .rbc-toolbar-label {
      text-align: left;
    }

    .rbc-event {
      background-color: rgba(8, 196, 240, 0.3);
      border-radius: 8px;
      border: 0;
      border-left: 6px solid #05c2f2;
      padding: 6px 10px;
      width: calc(100% - 10px) !important;
      margin: 0 5px;
      transition: 0.3s all;
      position: relative;
      left: 0 !important;

      :hover {
        min-height: 40px !important;

        &:after {
          content: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4wICg0MDM1YTRmYjQ5LCAyMDIwLTA1LTAxKSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iaWNvbm1vbnN0ci10cmFzaC1jYW4tMi5zdmciCiAgIGlkPSJzdmc0IgogICB2ZXJzaW9uPSIxLjEiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgaGVpZ2h0PSIyNCIKICAgd2lkdGg9IjI0Ij4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExMCI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczgiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOmN5PSIxMiIKICAgICBpbmtzY2FwZTpjeD0iMTIiCiAgICAgaW5rc2NhcGU6em9vbT0iNDIiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEzNzciCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIyNTYwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiIC8+CiAgPHBhdGgKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIgogICAgIGlkPSJwYXRoMiIKICAgICBkPSJNOSAxOWMwIC41NTItLjQ0OCAxLTEgMXMtMS0uNDQ4LTEtMXYtMTBjMC0uNTUyLjQ0OC0xIDEtMXMxIC40NDggMSAxdjEwem00IDBjMCAuNTUyLS40NDggMS0xIDFzLTEtLjQ0OC0xLTF2LTEwYzAtLjU1Mi40NDgtMSAxLTFzMSAuNDQ4IDEgMXYxMHptNCAwYzAgLjU1Mi0uNDQ4IDEtMSAxcy0xLS40NDgtMS0xdi0xMGMwLS41NTIuNDQ4LTEgMS0xczEgLjQ0OCAxIDF2MTB6bTUtMTd2MmgtMjB2LTJoNS43MTFjLjkgMCAxLjYzMS0xLjA5OSAxLjYzMS0yaDUuMzE1YzAgLjkwMS43MyAyIDEuNjMxIDJoNS43MTJ6bS0zIDR2MTZoLTE0di0xNmgtMnYxOGgxOHYtMThoLTJ6IiAvPgo8L3N2Zz4K');
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: -6px;
          right: 0;
          bottom: 0;
          position: absolute;
          background: ${({ theme }) => theme.palette.error};
          pointer-events: none;
        }
      }

      .rbc-event-label {
        white-space: normal;
        color: ${({ theme }) => theme.palette.dark};
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
        padding-right: 10px;
      }

      .rbc-event-content {
        display: none;
      }
    }

    .rbc-events-container {
      margin-right: 0;
    }

    .rbc-btn-group {
      button:first-of-type {
        display: none;
      }
    }

    .rbc-day-slot .rbc-timeslot-group .past-timeslot {
      background: #ececec;
      flex: 1;
      cursor: not-allowed !important;
    }
  }
`;
export const AvailabilityCalendarTitle = styled.div`
  margin-bottom: 30px;
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 0;
  margin-bottom: 25px;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding-left: 44px;
  }
`;

export const ToolbarPart = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
    justify-content: initial;
  }
`;

export const ToolbarClear = styled.p`
  margin: 0 0 0 10px;
  color: ${({ theme }) => theme.palette.grayMiddle};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
    margin-top: 0;
  }
`;

export const ToolbarNavigationWrapper = styled.div`
  border-radius: 72px;
  border: 1px solid #ececec;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  display: flex;
`;

export const ToolbarNavigation = styled.div`
  cursor: pointer;
  padding: 12px 20px;
`;

export const ToolbarLabel = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.dark};
  margin-left: 30px;
  margin-right: 30px;
`;
