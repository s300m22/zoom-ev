/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import {
  IScrollSpyComponentFields,
  IScrollSpyBlock,
  IScrollSpyBlockItem,
} from '../../../interfaces/contentful.types.generated';
import { Container, RichTextRenderer } from '../../../elements';
import {
  ContentWrapper,
  SidebarComponent,
  ContentComponent,
  SidebarHeader,
  SidebarComponentBlock,
  ContentComponentTitle,
  SidebarComponentBlockTitle,
  SidebarComponentBlockItemContent,
  BlockIndent,
  // BackToTopButton,
} from './ScrollSpyComponent.styled';
import { useMediaDevice } from '../../../hooks';
import { CategoriesExpand } from '../../Blog/BlogPostsList/BlogPostsList.styled';
import { ArrowRightIcon } from '../../../icons';

const ScrollSpyComponent = ({ title, blocks = [] }: IScrollSpyComponentFields) => {
  const { isMobile, isTablet } = useMediaDevice();
  const [activeIndex, setActiveIndex] = useState(0);
  const [elPosList, setElPosList] = useState<{ key: string; pos: number }[]>([]);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setElPosList(
      blocks.map((bl, bi) => ({
        key: `SCROLL-SPY-SECTION-${bi}`,
        pos: document.getElementById(`SCROLL-SPY-SECTION-${bi}`)?.offsetTop ?? 0,
      })),
    );

    document.body.classList.add('nooverflow');

    return () => {
      document.body.classList.remove('nooverflow');
    };
  }, [blocks, isMobile, isTablet]);

  const onScroll = () => {
    const scrollPosition = window.pageYOffset;
    elPosList.forEach((el, li) => {
      if (el.pos <= scrollPosition) {
        setActiveIndex(li);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [elPosList]); // eslint-disable-line

  return (
    <Container id="MainContainer">
      <ContentWrapper>
        <SidebarComponent
          onClick={() => {
            if (isMobile || isTablet) {
              setExpanded(!expanded);
            }
          }}
        >
          <CategoriesExpand expanded={expanded} />
          <SidebarHeader>In this document</SidebarHeader>
          {(expanded || (!isTablet && !isMobile)) && (
            <>
              {' '}
              {blocks.map((block: IScrollSpyBlock, index: number) => (
                <SidebarComponentBlock
                  active={activeIndex === index}
                  key={`sbi-${index}`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (isMobile || isTablet) {
                      const ele = elPosList.find(
                        (elp) => elp.key === `SCROLL-SPY-SECTION-${index}`,
                      );
                      window.scrollTo({ top: ele!.pos, behavior: 'smooth' }); // eslint-disable-line
                    } else {
                      document
                        ?.getElementById(`SCROLL-SPY-SECTION-${index}`)
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {block.fields.indent && (
                    <BlockIndent>
                      <ArrowRightIcon />
                    </BlockIndent>
                  )}
                  {block.fields.title}
                </SidebarComponentBlock>
              ))}
            </>
          )}
        </SidebarComponent>
        <ContentComponent>
          <ContentComponentTitle>{title}</ContentComponentTitle>

          {blocks.map((block: IScrollSpyBlock, index: number) => (
            <div id={`SCROLL-SPY-SECTION-${index}`} key={`sc-${index}`}>
              {block.fields.showTitle && (
                <SidebarComponentBlockTitle>{block.fields.title}</SidebarComponentBlockTitle>
              )}

              {block.fields.items?.map((item: IScrollSpyBlockItem, ind2: number) => (
                <SidebarComponentBlockItemContent key={`scb-${ind2}`}>
                  {item.fields.showTitle && (
                    <ContentComponentTitle>{item.fields.title}</ContentComponentTitle>
                  )}
                  {/* {block.fields.showTitle && (
                    <SidebarComponentBlockItemTitle>
                      {index + 1}.{ind2 + 1}:
                    </SidebarComponentBlockItemTitle>
                  )} */}
                  <RichTextRenderer>{item.fields.content}</RichTextRenderer>
                </SidebarComponentBlockItemContent>
              ))}
            </div>
          ))}
        </ContentComponent>

        {/* <BackToTopButton
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top <ArrowBottomIcon height={20} width={20} />
        </BackToTopButton> */}
      </ContentWrapper>
    </Container>
  );
};

export default ScrollSpyComponent;
