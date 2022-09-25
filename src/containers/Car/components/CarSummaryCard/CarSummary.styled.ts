import styled from 'styled-components';

export const CarSummaryGrid = styled.div`
  display: grid;
  text-align: center;
  width: 100%;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  margin: 10px 0 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    grid-template-columns: repeat(5, 1fr);
    text-align: left;
  }
`;
export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

export const RatingsCount = styled.span`
  margin-left: 5px;
  display: inline-block;
`;

export const GalleryWrapper = styled.div`
  position: relative;
  .image-gallery {
    .image-gallery-slide {
      display: flex;
      align-items: center;
      justify-content: center;

      ${({ theme }) => theme.up(theme.breakpoints.sm)} {
        height: 405px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .image-gallery-thumbnail {
      border: none;
      opacity: 0.5;
      transition: 0.3s all;
      cursor: pointer;
      margin: 0 5px;

      &.active,
      &:hover {
        border: none;
        opacity: 1;
      }
    }

    .image-gallery-thumbnails {
      padding: 0;
      margin: 10px 0 0;
    }

    .image-gallery-thumbnail-image {
      border-radius: 8px;
      height: 71px;
      object-fit: cover;

      &:hover {
        border: none;
      }
    }
  }
`;
