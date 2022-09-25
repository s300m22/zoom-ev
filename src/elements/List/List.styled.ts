import styled, { css } from 'styled-components';

interface ListWrapperProps {
  listColumns: number;
}

export const ListContainerCSS = () => css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 0px;
  margin: 10px 0;
  padding: 0;
`;

export const ListItemCSS = () => css`
  display: flex;
  margin: 20px 20px 20px 34px;
  position: relative;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary};
  font-size: 18px;
  list-style-type: none;
  &:after {
    content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA81BMVEUAAAAb06xHxd9LwestycMk0Lg2y89Gxd4j0LVAxtk8wtdNwugg0bAb0qs5wMA2yc0yy8cmz7owzMVJxOM8x9Iqzb5LyuROv+c1xtEf268uzMMd0K0X1aQxx8Amz7lIwuJHwt0ly7ZV//84ys87y9FNweZExdoYz54a06pHxOEh0LM/x9cc0q1Ax9hFxd5Rwus6ydBHw+IpzrtJxeAiz7NGx+Qyzcwh0bNPwek5yM0wy8VNwucrzr5Mwucqzr0szMQyyMEY06owycIhz7Ihz7Aa061Qwuk7x9Mozb8Vz6omzrg/x9gozrxHxOE4yc8h0LJPwuoRAyGCAAAAS3RSTlMAGRkZGRkZdXV1GXV1dQN1dXX+dXV1EgwMCnVOExKGdR8eA/51TU0O+vf22diHhmdnY1AwJSQW/vf39t3c1NR0a2lkZGRjU1JMMC+rS3GGAAABNklEQVQoz22Se1eCQBDF2V2QWFLIDEnEBEN7W756v9+Z1vf/NN1Z2ROe4/x5f9yZnbkYusJ4YppmM0yNYqWB5CWUiYor/3ooZUkDy7K2tV7nnMMBWQFm9fLvBYFh99TznwYjIkx5UgHQ7jq1Xc9vbG0MEgBGcwIuePvM1mDthUgzN2Q7tuPUPP8eYD0iCyYDjF2A48PL6l0LoPwJ0DMCIcSbu2mf7E/n1e+DFkDEqBd03ofjdkbg5wjgMQdcuAC/s2kHYA+gzFALgFYXKwDvA1yrVufU6lWBAI5sMbyzNLwOxxAAz51f3ajnjhgdpULPygBowYZeEDdBr+WTPCdqPwMWTkfUjihhFgw6Di7H7zj7w8cXnV1HBSKlRFB5gqwYYQlA6cVoMSeGDkBE/wwahQH0SRxq4Q9m/SPoqeq3ggAAAABJRU5ErkJggg==');
    position: absolute;
    width: 24px;
    height: 24px;
    left: -34px;
    top: calc(50% - 12px);
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const ListContainer = styled.ul<ListWrapperProps>`
  ${ListContainerCSS}

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    grid-template-columns: repeat(${({ listColumns }) => listColumns}, 1fr);
  }
`;

export const ListItem = styled.li`
  ${ListItemCSS}
`;
