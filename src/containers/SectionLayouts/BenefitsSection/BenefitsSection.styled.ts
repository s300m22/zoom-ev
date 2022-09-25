import styled from 'styled-components';
import { Container } from '../../../elements';

export const Wrapper = styled(Container)`
  display: flex;
  padding: 45px 0;
  flex-direction: column;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 130px 0 15px;
    text-align: left;
  }
`;

export const SubtextContainer = styled.div`
  display: none;
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    display: block;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export const Paragraph = styled.p`
  max-width: 640px;
  margin: 20px 0 0;
  color: ${({ theme }) => theme.palette.gray};
`;

export const BenefitsBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  background: ${({ theme }) => theme.palette.lightText};
  line-height: 24px;

  a {
    color: ${({ theme }) => theme.palette.hover};
    text-decoration: underline;
    font-weight: 500;
  }

  p {
    margin: 23px 0 0;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 30px 0;
  }

  &.text__container {
    img {
      max-height: 62px;
      align-self: center;

      ${({ theme }) => theme.up(theme.breakpoints.md)} {
        align-self: flex-start;
      }
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    &.image__container {
      img {
        transform: scale(1.15) translate(14%, -25%);

        &:nth-of-type(2) {
          transform: scale(1.15) translate(20%, -25%);
        }
      }
    }
  }
`;

interface ButtonTabsProps {
  type: string;
}

export const ButtonTabs = styled.div<ButtonTabsProps>`
  display: ${(props) => (props.type === 'top' ? 'flex' : 'none')};
  flex-wrap: nowrap;
  margin: 10px 0 10px 0;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    display: ${(props) => (props.type === 'bottom' ? 'flex' : 'none')};
    margin: 67px 0 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 0;
  }

  button {
    width: 100%;
    background: #f2f2f2;
    border-radius: 12px;
    padding: 10px;
    height: 71px;
    transition: 0.6s all;
    filter: grayscale(100%) opacity(0.6);
    margin: 5px;

    &:last-of-type {
      margin-bottom: 0;
      margin-right: 0;
    }

    img {
      max-height: 100%;
      max-width: 100%;
    }

    &.active,
    &:hover {
      background: #fff;
      box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.2);
      filter: grayscale(0%) opacity(1);
    }

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 31.5%;
      margin-top: 0;
      margin: 0 5px 15px;
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin: 0 16px;
    }
  }
`;

export const Subsection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  ${Column} {
    width: 100%;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    ${Column} {
      width: 50%;
    }

    &:nth-of-type(2n + 1) {
      flex-direction: row-reverse;
    }
  }
`;

export const BenefitSubsectionContainer = styled.div`
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.blue};
  padding-bottom: 90px;
  margin-bottom: 60px;
  p {
    color: ${({ theme }) => theme.palette.gray};
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    border-bottom: 0;
    padding: 130px 0;
    padding-bottom: 0;
    margin-bottom: 0;
    justify-content: flex-start;

    &:nth-of-type(2n + 1) {
      flex-direction: row-reverse;

      ${Subsection} {
        flex-direction: row-reverse;
      }

      ${Column} {
        &.image__container {
          img {
            transform: scale(1.15) translate(-17%, -15%);
          }
        }
      }
    }

    &:nth-of-type(3) {
      ${ButtonTabs} {
        margin-top: 30px;
      }
    }
  }
`;

export const CategoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 50%;
  }

  p {
    margin: 20px 0 0;
  }
`;

export const GreenLine = styled.div`
  width: 64px;
  height: 4px;
  background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
  margin: 30px auto;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 30px 0;
  }
`;

export const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    justify-content: normal;
    align-self: normal;
  }
`;

export const BenefitsListItem = styled.div`
  padding-left: 30px;
  padding-bottom: 30px;
  position: relative;
  text-align: left;

  &:after {
    content: '';
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA81BMVEUAAAAb06xHxd9LwestycMk0Lg2y89Gxd4j0LVAxtk8wtdNwugg0bAb0qs5wMA2yc0yy8cmz7owzMVJxOM8x9Iqzb5LyuROv+c1xtEf268uzMMd0K0X1aQxx8Amz7lIwuJHwt0ly7ZV//84ys87y9FNweZExdoYz54a06pHxOEh0LM/x9cc0q1Ax9hFxd5Rwus6ydBHw+IpzrtJxeAiz7NGx+Qyzcwh0bNPwek5yM0wy8VNwucrzr5Mwucqzr0szMQyyMEY06owycIhz7Ihz7Aa061Qwuk7x9Mozb8Vz6omzrg/x9gozrxHxOE4yc8h0LJPwuoRAyGCAAAAS3RSTlMAGRkZGRkZdXV1GXV1dQN1dXX+dXV1EgwMCnVOExKGdR8eA/51TU0O+vf22diHhmdnY1AwJSQW/vf39t3c1NR0a2lkZGRjU1JMMC+rS3GGAAABNklEQVQoz22Se1eCQBDF2V2QWFLIDEnEBEN7W756v9+Z1vf/NN1Z2ROe4/x5f9yZnbkYusJ4YppmM0yNYqWB5CWUiYor/3ooZUkDy7K2tV7nnMMBWQFm9fLvBYFh99TznwYjIkx5UgHQ7jq1Xc9vbG0MEgBGcwIuePvM1mDthUgzN2Q7tuPUPP8eYD0iCyYDjF2A48PL6l0LoPwJ0DMCIcSbu2mf7E/n1e+DFkDEqBd03ofjdkbg5wjgMQdcuAC/s2kHYA+gzFALgFYXKwDvA1yrVufU6lWBAI5sMbyzNLwOxxAAz51f3ajnjhgdpULPygBowYZeEDdBr+WTPCdqPwMWTkfUjihhFgw6Di7H7zj7w8cXnV1HBSKlRFB5gqwYYQlA6cVoMSeGDkBE/wwahQH0SRxq4Q9m/SPoqeq3ggAAAABJRU5ErkJggg==');
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    left: 0;
    top: 8px;
  }
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding-left: 53px;

    &:after {
      width: 33px;
      height: 33px;
    }
  }

  p {
    margin: 0;
    line-height: 24px;
  }
`;
