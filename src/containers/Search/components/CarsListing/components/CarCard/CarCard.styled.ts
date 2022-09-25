import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../../elements/SimpleCard/SimpleCard.styled';

interface CarCardWrapperProps {
  isEmbedded?: boolean;
}

export const CarCardWrapper = styled(SimpleCardWrapper)<CarCardWrapperProps>`
  width: 100%;
  align-self: flex-start;
  margin-bottom: 30px;
  padding: 10px;
  height: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    max-width: 352px;
    margin-bottom: 0;
  }

  ${({ isEmbedded, theme }) =>
    isEmbedded &&
    `
      font-size: 16px;
      z-index: 1;
      transform: translateY(calc(-100% - 55px)) translateX(-50%);
      pointer-events: auto;
      
      svg { 
        position: static;
      }

      ${theme.up(theme.breakpoints.sm)} {
        display: flex;
        width: 352px;
  
        ::after {
          content: ' ';
          position: absolute;
          top: 92.5%; /* At the bottom of the tooltip */
          left: 50%;
          margin-left: -10px;
          border-width: 10px;
          border-style: solid;
          border-color: #fff transparent transparent transparent;
        }
      }
      
      ${theme.up(theme.breakpoints.lg)} {
        ::after {
          top: 100%; /* At the bottom of the tooltip */
        }
      }
  `}
`;

export const CarCardContent = styled.div`
  padding: 0 10px;
`;

export const AvarageRatings = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

export const CarReviewsCountsWrapper = styled.span`
  margin-left: 5px;
  display: inline-block;
  color: ${({ theme }) => theme.palette.gray};
`;

export const CarCardFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CarCardPhotoWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;
