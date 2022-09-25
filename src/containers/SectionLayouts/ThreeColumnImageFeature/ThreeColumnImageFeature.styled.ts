import styled from 'styled-components';
import { Container } from '../../../elements';

export const Wrapper = styled(Container)(
  ({ theme: { breakpoints, up } }) => `
    margin-top: 50px;
    margin-bottom: 120px;
    text-align: center;
    ${up(breakpoints.md)} {
        margin-bottom: 50px;
      }
    `,
);

export const ImageWrapper = styled(Container)(
  ({ theme: { breakpoints, up } }) => `
      display: block;
      justify-content: space-between;
      align-items: center;
      padding-top: 40px;

        a {
            width: 100%;
            max-width: 350px;

            img {
                margin: auto;
                margin-bottom: 20px;
                max-width: 350px;
                width: 100%;
                border-radius: 12px;
            }
        }

        ${up(breakpoints.md)} {
            display: flex;
            a {
                width: 31%;
                max-width: 600px;
                img {
                    margin-bottom: 0;
                    margin: 0;
                    max-width: 600px;
                width: 100%;

                }
            }
          }
      `,
);
