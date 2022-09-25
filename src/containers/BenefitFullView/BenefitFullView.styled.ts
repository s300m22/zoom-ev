import styled from 'styled-components';

export const GreenLine = styled.div`
  width: 64px;
  height: 4px;
  background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
  margin: 0px 0;
`;

export const Container = styled.div`
  background-color: white;
  position: absolute;
  top: 100px;
  left: 0;
  height: 100vh;
  padding-bottom: 100px;
  /* overflow: auto; */
  width: 100vw;
  z-index: 99;
  .sticky-cta-mobile {
    h3 {
      margin: 0;
    }
  }

  .sticky-cta {
    position: fixed;
    right: 0;
    top: 40vh;
    button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .header {
    background-size: 100% 70%;
    background-repeat: no-repeat;
    padding-top: 300px;
    position: relative;
    ${({ theme }) => theme.down(theme.breakpoints.lg)} {
      padding-top: 100px;
    }
    .bg-image {
      position: absolute;
      width: 100%;
      height: 70%;
      top: 0;
      background-size: cover;
    }
    .bg-image-overlay {
      position: absolute;
      width: 100%;
      height: 70%;
      top: 0;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.4),
        rgb(0, 0, 0)
      );
    }
    .potential-cta {
      position: absolute;
      top: 20px;
      width: 100%;
      .inner {
        max-width: 1220px;
        margin: 0 auto;
        width: 100%;
      }
    }
    .inner-header {
      position: relative;
      max-width: 1220px;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 50px;
      ${({ theme }) => theme.down(theme.breakpoints.lg)} {
        padding: 10px;
      }
      h1 {
        color: white;
        margin-bottom: 100px;
      }

      > h1 {
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          display: none;
        }
      }

      .details-block {
        position: relative;
        background-color: white;
        width: 100%;
        border-radius: 15px;
        min-height: 400px;
        box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
        padding: 40px 40px;

        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          padding: 20px 20px;

          border-bottom: 2px solid;
          border-image-slice: 1;
          border-image-source: linear-gradient(
            to left,
            rgb(0 191 243 / 3%),
            rgb(0 191 243 / 43%),
            rgb(0 191 243 / 3%)
          );
        }
        .logo {
          position: absolute;
          top: -40px;
          background-color: white;
          box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
          border-radius: 15px;
          left: calc(50% - 125px);
          height: 100px;
          width: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          img {
            max-width: 100%;
            max-height: 100%;
          }

          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            padding: 15px;
            width: 200px;
            height: 90px;
            left: calc(50% - 100px);
          }
        }
        .details-content-holder {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            flex-direction: column;
          }

          .redemption-code {
            width: 100%;
            flex-shrink: 0;
            flex-grow: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 20px;
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              margin-top: 40px;
            }
            .title-and-code {
              font-size: 48px;
              font-weight: 800;
              span {
                display: block;
                margin-bottom: 5px;
                font-size: 17px;
                color: gray;
                font-weight: 400;
              }
              ${({ theme }) => theme.down(theme.breakpoints.lg)} {
                font-size: 28px;
              }
            }
            .clip {
              background: transparent;
              border: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #2bc0f3;
              font-size: 14px;
              line-height: 25px;
              text-decoration: underline;
              font-weight: 500;
              margin-left: 11px;
              cursor: pointer;
            }
          }
          .how-to-access-benefit {
            margin-top: 50px;
            width: 60%;
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              width: 100%;
            }

            > h3 {
              margin: 0;
              font-size: 28px;
              margin-bottom: -14px;
              ${({ theme }) => theme.down(theme.breakpoints.lg)} {
                font-size: 24px;
                margin-bottom: 10px;
              }
            }
            .instruction {
              margin: 0;
              font-size: 16px;
              color: #707070;
            }
          }
          .benefit-access-links {
            width: 40%;
            margin-top: 50px;
            padding-left: 30px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              width: 100%;
              padding-left: 0;
            }
            > h3 {
              margin: 0;
              margin-bottom: 15px;
            }
            .store-links {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              ${({ theme }) => theme.down(theme.breakpoints.lg)} {
                flex-direction: column;
              }
              a {
                display: block;
                background-color: #202020;
                border-radius: 12px;
                padding-top: 12px;
                padding-bottom: 8px;
                width: 48%;
                text-align: center;
                :hover {
                  background-color: black;
                }
                svg {
                  margin: auto;
                }

                ${({ theme }) => theme.down(theme.breakpoints.lg)} {
                  width: 100%;
                  margin-top: 10px;
                }
              }
            }
            .contact-links {
              /* display: flex;
              justify-content: flex-start;
              align-items: center; */
              a {
                margin: 15px 0px;
                color: #00bff3;
                text-decoration: none;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                svg {
                  margin-right: 8px;
                }
              }
            }

            .pl-error {
              color: red;
              strong {
                display: block;
              }
            }
            .pl-status {
              color: #707070;
              max-width: 300px;
              strong {
                color: #202020;
              }
            }
            .buttonRequested {
              background-color: white;
              border-radius: 50px;
              padding: 20px 40px;
              box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
            }
          }
          .back-btn {
            color: #061027;
            font-weight: 600;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            /* margin-bottom: 60px; */
            svg {
              height: 25px;
              width: 25px;
              margin-right: 10px;
            }
            &:hover {
              cursor: pointer;
              color: black;
            }

            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              span {
                display: none;
              }
            }
          }
          .left-side {
            width: 60%;
            flex-shrink: 0;
            flex-grow: 0;
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              width: 100%;
            }
            .back-btn {
              margin-bottom: 50px;
            }

            h1 {
              font-size: 3em;
              margin: 20px 0;
              color: black;
            }
            span.small {
              font-size: 10px;
              color: gray;
              font-style: italic;
              line-height: 18px;
            }
            .list-item {
              margin-right: 2px;
              h2 {
                margin: 0 0 0 0;
              }
              p {
                margin: 0 0 0 0;
                color: #6a707d;
              }
            }
          }

          .price-card {
            background-color: white;
            box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
            padding: 40px 40px;
            margin-top: 30px;
            width: 350px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border-radius: 15px;
            flex-direction: column;
            text-align: center;
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              display: none;
            }

            .unlock-icon {
              margin-top: -80px;
              height: 60px;
              width: 60px;
            }
            h5 {
              margin-bottom: 0;
            }
            p {
              color: gray;
            }
            h4 {
              color: gray;
              width: 91%;
            }
            .price {
              font-size: 3rem;
              font-weight: 800;
            }
            small {
              color: gray;
            }

            &.partner {
              margin-top: 0px;
              padding: 10px 40px;
              padding-bottom: 30px;

              img {
                max-height: 250px;
              }
            }
          }
          .partner-unlock-icon {
            display: flex;
            width: 350px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              display: none;
            }
            .lock-icon {
              height: 44px;
              width: 44px;
              margin-left: 10px;
            }
            .cntent {
              flex-grow: 0;
              width: 74%;
            }
            h5 {
              margin: 0;
              margin-bottom: 10px;
              font-size: 18px;
            }

            p {
              margin: 0;
              width: 80%;
              margin: auto;
              color: #707070;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  .body {
    max-width: 1120px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
    background-color: white;
    ${({ theme }) => theme.down(theme.breakpoints.lg)} {
      padding-left: 20px;
      padding-right: 20px;
    }

    .post-purchase-dynamic-features {
      h1 {
        font-size: 2.7em;
        margin: 25px 0;
        color: black;
      }
      span.small {
        font-size: 10px;
        color: gray;
        font-style: italic;
        line-height: 18px;
        max-width: 700px;
        display: block;
      }
      .list-item {
        margin-right: 2px;
        h2 {
          margin: 0 0 4px 0;
        }
        p {
          margin: 0 0 0 0;
          color: #6a707d;
        }
      }
    }
    .three-images-feature {
      margin: 120px 0;
      a {
        color: #2ebff3;
        font-weight: 700;
        cursor: pointer;
      }
      h3 {
        font-size: 26px;
      }
      p {
        color: #707070;
      }
      h4 {
        color: #2ebff3;
      }
      .items {
        display: flex;
        align-items: start;
        justify-content: space-between;
        margin-top: 50px;
        margin-bottom: 50px;

        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          flex-direction: column;
        }

        .item {
          width: 30%;
          h5 {
            font-size: 18px;
            color: #2ebff3;
          }
          p {
            font-size: 14px;
            color: gray;
            line-height: 18px;
          }
          img {
            border-radius: 20px;
            margin-bottom: 10px;
            height: 300px;
            width: 100%;
            object-fit: cover;
          }
          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            width: 100%;
            margin-bottom: 40px;
          }
        }
      }
    }
    .component-title {
      font-size: 26px;
    }
    .video {
      margin: 120px 0;
      .title {
        color: #1497ce;
        font-weight: 500;
        margin-bottom: 20px;
        display: block;
      }
    }
    .works-well-with {
      margin: 120px 0;
      a {
        color: #2ebff3;
        font-weight: 700;
        cursor: pointer;
      }
      .benefits {
        display: flex;
        justify-content: flex-start;
        align-items: start;
        flex-wrap: wrap;
        margin-top: 30px;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          flex-direction: column;
          margin-top: 50px;
        }
        .benefit {
          width: 30%;
          flex-shrink: 0;
          flex-grow: 0;
          margin-right: 3.333%;
          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            width: 100%;
            margin-bottom: 60px;
          }
          .cover {
            img {
              height: 220px;
              object-fit: cover;
              border-radius: 20px;
              margin-bottom: 10px;
            }
          }
          .logo {
            max-width: 60%;
            height: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: left;
            }
          }
          .read-more {
            font-weight: 600;
            display: flex;
            align-items: center;
            svg {
              width: 20px;
              margin-left: 6px;
              transition: all ease-in-out 0.5s;
            }
            &:hover {
              cursor: pointer;
              svg {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    .faqs {
      margin: 120px 0;

      h3 {
        font-size: 26px;
      }
      .question {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to right, #00bff3, white);
        h5 {
          font-size: 16px;
        }
        .left {
          width: 95%;
        }
        .content {
          color: #707070;
        }
        .icon {
          padding-top: 25px;

          cursor: pointer;
        }
      }
    }
    .cta {
      margin: 120px 0;
      .content {
        max-width: 700px;
        width: 100%;
        margin: 40px 0;
        color: #707070;

        h1,
        h2,
        h3,
        h4,
        h5 {
          color: black;
        }
        h6 {
          font-size: 12px;
          color: gray;
          font-style: italic;
          line-height: 18px;
          font-weight: 400;
        }
        a {
          color: #00bff3;
        }
      }
      .list-item {
        h2 {
          margin: 0;
          font-size: 15px;
        }
        p {
          margin: 0;
          font-size: 11px;
          color: #6a707d;
        }
      }
    }
    .contact-and-help {
      margin: 120px 0;
      .card-holder {
        background-color: #e6f5fa;
        max-width: 800px;
        width: 100%;
        border-radius: 15px;
        display: flex;
        align-items: center;

        margin-top: 20px;
        box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          display: block;
        }
        h5 {
          font-size: 17px;
          margin: 10px 0;
        }
        .details {
          padding: 20px;
          padding-left: 30px;
          background-color: white;
          width: 50%;
          border-radius: 15px;
          box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            width: 100%;
          }
          a {
            display: block;
            color: #00bff3;
            cursor: pointer;
            margin: 15px 0;
            font-weight: 700;
            text-decoration: none;
            display: flex;
            align-items: center;
            svg {
              margin-right: 10px;
            }
          }
        }
        .hours {
          padding: 20px;
          padding-left: 60px;
          position: relative;
          svg {
            position: absolute;
            top: 27px;
            left: 24px;
          }
          .oh-item {
            font-size: 14px;
            margin: 5px 0;
            color: gray;
          }
        }
      }
    }

    .image-grid-and-features {
      margin: 120px 0;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      ${({ theme }) => theme.down(theme.breakpoints.lg)} {
        flex-direction: column;
      }
      .images {
        width: 36%;
        flex-shrink: 0;
        flex-grow: 0;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          width: 100%;
        }
      }
      .content {
        width: 56%;
        flex-shrink: 0;
        flex-grow: 0;
        color: #707070;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          width: 100%;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
          color: black;
        }

        .description {
          font-size: 13px;
          color: #616161;
          line-height: 20px;
          margin-bottom: 20px;
          h5 {
            color: #00bff3;
          }
        }
        .small {
          color: #636363;
          font-style: italic;
          font-size: 11px;
          letter-spacing: 0.5px;
          line-height: 16px;
        }
        .main-features {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .card {
            flex-direction: row;
            width: 32%;
            flex-shrink: 0;
            flex-grow: 0;
            background-color: rgb(0, 191, 243, 5%);
            padding: 20px 10px;
            border-radius: 10px;
            text-align: center;
            span {
              color: black;
              font-weight: 700;
              display: block;
              margin-bottom: 5px;
            }
            p {
              margin: 0;
              font-size: 12px;
              color: darkgray;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .features {
          h5 {
            font-size: 15px;
            color: #00bff3;
            margin-bottom: -20px;
          }
          .list-item {
            h2 {
              margin: 0;
              font-size: 15px;
              margin-bottom: 5px;
            }
            p {
              margin: 0;
              font-size: 11px;
              color: #6a707d;
            }
          }
        }
      }
    }
    .testimonials {
      margin: 120px 0;

      .slider-wrapper {
        display: flex;
        width: 100%;
        > svg {
          flex-shrink: 0;
          flex-grow: 0;
          width: 200px;
        }
        .slick-slider {
          width: 100%;
          max-width: 700px;
          margin-top: 20px;
          .testimonial {
            ${({ theme }) => theme.down(theme.breakpoints.lg)} {
              background-color: white;
              box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
              padding: 30px;
              border-radius: 20px;
              margin: 10px;
            }
            .inner {
              display: flex;
              /* justify-content: center; */
              align-items: center;
              ${({ theme }) => theme.down(theme.breakpoints.lg)} {
                flex-direction: column;
                align-items: flex-start;
              }
              img {
                max-width: 150px;
                max-height: 150px;
                margin-right: 20px;
                ${({ theme }) => theme.down(theme.breakpoints.lg)} {
                  /* position: absolute; */
                  max-width: 60px;
                  max-height: 60px;
                }
              }
              .content {
                color: gray;
                line-height: 21px;
              }
              .author {
                padding-top: 20px;
                padding-bottom: 20px;

                width: fit-content;
                margin-left: auto;
              }
            }
          }
        }
      }

      .slick-dots {
        margin: 10px 0;
        list-style-type: none;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;

        li {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          padding: 0;
          cursor: pointer;
          margin: 0 5px;
        }

        .slick-active {
          width: 30px;
        }
        .ft-slick__dots--custom {
          background-color: lightgrey;
          height: 10px;
          width: 10px;
          border-radius: 10px;
          position: relative;
          display: flex;
        }
        .slick-active .ft-slick__dots--custom {
          width: 30px;
          top: 0px;
          overflow: hidden;
          background-color: #00bff3;
        }
      }

      .slick-track {
        display: flex;
      }

      .slick-slider {
        display: flex;
        width: 100%;
        flex-direction: column;
      }

      .slick-slide {
        position: relative;
        width: auto;
        margin: 0;

        > div {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  img.image-gallery-image {
    border-radius: 10px;
  }

  .comparision-table-container-wrapper {
    background-color: #fbfbfb;
    padding: 40px;
    border-radius: 20px;
  }

  .little-dot {
    position: relative;
    &::after {
      content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA81BMVEUAAAAb06xHxd9LwestycMk0Lg2y89Gxd4j0LVAxtk8wtdNwugg0bAb0qs5wMA2yc0yy8cmz7owzMVJxOM8x9Iqzb5LyuROv+c1xtEf268uzMMd0K0X1aQxx8Amz7lIwuJHwt0ly7ZV//84ys87y9FNweZExdoYz54a06pHxOEh0LM/x9cc0q1Ax9hFxd5Rwus6ydBHw+IpzrtJxeAiz7NGx+Qyzcwh0bNPwek5yM0wy8VNwucrzr5Mwucqzr0szMQyyMEY06owycIhz7Ihz7Aa061Qwuk7x9Mozb8Vz6omzrg/x9gozrxHxOE4yc8h0LJPwuoRAyGCAAAAS3RSTlMAGRkZGRkZdXV1GXV1dQN1dXX+dXV1EgwMCnVOExKGdR8eA/51TU0O+vf22diHhmdnY1AwJSQW/vf39t3c1NR0a2lkZGRjU1JMMC+rS3GGAAABNklEQVQoz22Se1eCQBDF2V2QWFLIDEnEBEN7W756v9+Z1vf/NN1Z2ROe4/x5f9yZnbkYusJ4YppmM0yNYqWB5CWUiYor/3ooZUkDy7K2tV7nnMMBWQFm9fLvBYFh99TznwYjIkx5UgHQ7jq1Xc9vbG0MEgBGcwIuePvM1mDthUgzN2Q7tuPUPP8eYD0iCyYDjF2A48PL6l0LoPwJ0DMCIcSbu2mf7E/n1e+DFkDEqBd03ofjdkbg5wjgMQdcuAC/s2kHYA+gzFALgFYXKwDvA1yrVufU6lWBAI5sMbyzNLwOxxAAz51f3ajnjhgdpULPygBowYZeEDdBr+WTPCdqPwMWTkfUjihhFgw6Di7H7zj7w8cXnV1HBSKlRFB5gqwYYQlA6cVoMSeGDkBE/wwahQH0SRxq4Q9m/SPoqeq3ggAAAABJRU5ErkJggg==');
      position: absolute;
      width: 24px;
      height: 24px;
      left: -28px;
      top: -2px;
    }
  }
`;
