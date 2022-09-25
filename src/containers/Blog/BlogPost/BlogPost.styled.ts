import styled from 'styled-components';
import { Container } from '../../../elements';
import { StyledButton } from '../../../elements/Button/Button.styled';

export const BlogPostWrapper = styled.div`
  main {
    padding: 0;
  }
`;

export const HeaderContainer = styled.div(
  ({ theme: { up, breakpoints } }) => `
    width: 100%;
    position: relative;
    background: linear-gradient(0deg, rgba(6, 16, 39, 0.5), rgba(6, 16, 39, 0.5));

    ${up(breakpoints.md)} {
      height: 400px;
    }
  `,
);

export const HeaderContent = styled(Container)(
  ({ theme: { palette, up, breakpoints } }) => `
    padding: 75px 15px 0;
    max-width: 736px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    color: ${palette.secondary};
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    ${up(breakpoints.lg)} {
      padding: 150px 0 0 0;
    }
  `,
);

export const Thumbnail = styled.div`
  position: absolute;
  z-index: -999;
  width: 100%;
  height: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const Tags = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const Tag = styled(StyledButton)(
  ({ theme: { palette }, variant }) => `
    padding: 6px 20px 7px;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    margin-right: 10px;
    height: auto;
    color: ${palette.primary};
    background: rgba(255, 255, 255, 0.9);
    ${
      variant === 'link' &&
      `
        :hover, :active {
          background: ${palette.lightText};
        }
      `
    }
  `,
);

export const MainContent = styled.div(
  ({ theme }) => `
    padding: 30px 15px 0;
    max-width: 736px;
    width: 100%;
    margin: 0 auto;

    ${theme.up(theme.breakpoints.lg)} {
      padding: 30px 0 0;
    }
  `,
);

export const PostBody = styled.div`
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightText};
  padding: 30px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 180%;
`;

export const OtherPostsContainer = styled.div`
  padding: 90px 0;
`;

export const AuthorCaption = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
