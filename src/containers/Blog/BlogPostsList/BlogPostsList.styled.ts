import styled from 'styled-components';
import { Container } from '../../../elements';
import {
  DescriptionWrapper as PostDescriptionWrapper,
  HeaderWrapper as PostHeaderWrapper,
  ImageContainer as PostThumbnail,
  WidthWrapper as PostWidthWrapper,
  Wrapper as PostWrapper,
} from '../../SectionLayouts/MultipleColumnsItemLayout/MultipleColumnsItemLayout.styled';

export const PostsList = styled.div(
  ({ theme: { breakpoints, down } }) => `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
    grid-row-gap: 32px;
    margin-bottom: 40px;
    
    ${down(breakpoints.sm)} {
      grid-template-columns: 1fr;
      grid-row-gap: 16px;

      ${PostWrapper} {
        max-width: 100%;
      }

      ${PostThumbnail} {

        img {
          width: 100%;
          height: auto;
        }
      }
    }
  
    ${down(breakpoints.md)} {
      width: 100%;
    }

    ${PostWrapper} {
      margin-bottom: 0;
    }

    ${PostWidthWrapper} {
      align-items: flex-start;
    }
    
    ${PostDescriptionWrapper} {
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      min-height: 72px;
    }

    ${PostHeaderWrapper} {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      margin-bottom: 10px;

      ${down(breakpoints.md)} {
        min-height: 54px;
      }
    }

  `,
);

export const PostsWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: calc(100% - 384px);

    ${down(breakpoints.md)} {
      min-width: 100%;  
    }
  `,
);

export const Wrapper = styled(Container)``;

export const PageHeaderWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => `
  margin: 90px 0;

  ${down(breakpoints.md)} {
    margin: 3.5% 0;
  }
`,
);

export const MainContent = styled.div(
  ({ theme: { breakpoints, down } }) => `
    display: flex;
    padding-bottom: 130px;

    ${down(breakpoints.md)} {
      flex-direction: column-reverse;  
    }
  `,
);

export const CategoriesCardHeader = styled.div`
  margin: 30px;
`;

interface CategoryItemProps {
  selected?: boolean;
}

export const CategoryItem = styled.div<CategoryItemProps>(
  ({ selected, theme: { palette } }) => `
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    cursor: pointer;
    border-left: 3px solid transparent;

    :hover {
      background: ${palette.action.hover};
    }

    ${
      selected &&
      `
        border-left: 3px solid #28ceba;
        font-weight: 600;
    `
    }
  `,
);

interface CategoriesCardProps {
  expanded: boolean;
}

export const CategoriesCard = styled.div<CategoriesCardProps>(
  ({
    theme: {
      palette: { boxShadow, secondary, lightText },
      breakpoints,
      up,
    },
    expanded,
  }) => `
    width: 100%;
    height: 100%;
    max-height: ${expanded ? '570px' : '90px'};
    overflow: hidden;
    position: relative;
    background: ${secondary};
    box-shadow: ${boxShadow};
    border-radius: 12px;
    transition: max-height 0.25s ease-in;
    cursor: pointer;
    margin-bottom: 30px;

    ${CategoryItem}:not(:last-of-type) {
      border-bottom: 1px solid ${lightText};
    }

    ${CategoryItem}:last-of-type {
      border-bottom-left-radius: 12px;
    }
    
    ${up(breakpoints.md)} {
      max-height: unset;
      cursor: initial;
      margin-left: 32px;
    }

    ${up(breakpoints.lg)} {
      width: 352px;
    }
  `,
);

interface CategoriesExpandProps {
  expanded: boolean;
}

export const CategoriesExpand = styled.div<CategoriesExpandProps>(
  ({ theme: { breakpoints, up }, expanded }) => `
    position: absolute;
    top: 42px;
    right: 30px;
    border: solid black;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 4px;
    transition: transform 0.25s ease-in;
    transform: ${expanded ? 'rotate(-135deg);' : 'rotate(45deg)'};

    ${up(breakpoints.md)} {
      display: none;
    }
  `,
);

export const NoArticlesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 42px;
  width: 100%;
  height: 100%;
`;
