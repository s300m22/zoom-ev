import React from 'react';
import {
  IBlogPostFields,
  IColumnSection,
  ICustomSectionFields,
  IFaqFields,
  ICardFields,
} from '../../../../interfaces/contentful.types.generated';
import ColumnSectionLayout from '../../ColumnSectionLayout';
import {
  ColumnsSectionWrapper,
  TextWrapper,
  CtaWrapper,
  Wrapper,
} from './ColumnsSectionLayout.styled';
import MultipleColumnsItemLayout from '../../MultipleColumnsItemLayout';
import { Button, Card, Heading } from '../../../../elements';
import { convertToSlug } from '../../../../utils';
import UnsupportedSection from '../../UnsupportedSection';

const ColumnsSectionLayout = ({
  background = 'light',
  columns,
  layout,
  padding,
  title,
  noTitle,
  titleVariant = 'h2',
  ctaButton,
  dotsPatterns = false,
}: ICustomSectionFields) => {
  if (!columns) {
    return null;
  }

  return (
    <Wrapper background={background} dotsPatterns={dotsPatterns} padding={padding}>
      {title && !noTitle && (
        <TextWrapper>
          <Heading variant={titleVariant}>{title}</Heading>
        </TextWrapper>
      )}
      <ColumnsSectionWrapper background={background} layout={layout}>
        {columns.map((column) => {
          switch (column.sys.contentType.sys.id) {
            case 'columnSection': {
              const { fields } = column as IColumnSection;
              return <ColumnSectionLayout {...fields} key={column.sys.id} />;
            }
            case 'faq': {
              const { question, answer } = column.fields as IFaqFields;
              return (
                <MultipleColumnsItemLayout
                  description={answer}
                  key={column.sys.id}
                  readMoreLink={`/faqs/${convertToSlug(question)}`}
                  title={question}
                />
              );
            }
            case 'blogPost': {
              const {
                title: blogPostTitle,
                body,
                thumbnail,
                slug,
              } = column.fields as IBlogPostFields;
              return (
                <MultipleColumnsItemLayout
                  description={body}
                  image={thumbnail}
                  key={column.sys.id}
                  readMoreLink={`/blog/${slug}`}
                  title={blogPostTitle}
                />
              );
            }
            case 'card': {
              return <Card {...(column.fields as ICardFields)} />;
            }
            default:
              return <UnsupportedSection section={column} />;
          }
        })}
      </ColumnsSectionWrapper>
      {ctaButton && (
        <CtaWrapper>
          <Button link={ctaButton} />
        </CtaWrapper>
      )}
    </Wrapper>
  );
};

export default ColumnsSectionLayout;
