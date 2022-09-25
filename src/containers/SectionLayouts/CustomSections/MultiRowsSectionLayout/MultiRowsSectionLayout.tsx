import React from 'react';
import {
  IColumnSection,
  ICustomSection,
  ICustomSectionFields,
} from '../../../../interfaces/contentful.types.generated';
import { Heading } from '../../../../elements';
import { ColumnSectionLayout } from '../../index';
import {
  TitleWrapper,
  CardsContainer,
  RowContainer,
  Wrapper,
} from './MultiRowsSectionLayout.styled';
import UnsupportedSection from '../../UnsupportedSection';

const MultiRowsSectionLayout = ({
  title,
  columns,
  margin = '130px 0 0 0',
}: ICustomSectionFields) => {
  if (!columns) {
    return null;
  }
  return (
    <Wrapper margin={margin}>
      {title && (
        <TitleWrapper>
          <Heading variant="h2">{title}</Heading>
        </TitleWrapper>
      )}
      <CardsContainer>
        {columns.map((column) => {
          switch (column.sys.contentType.sys.id) {
            case 'columnSection': {
              const { fields, sys } = column as IColumnSection;

              return (
                <RowContainer key={sys.id}>
                  <ColumnSectionLayout {...fields} />
                </RowContainer>
              );
            }
            case 'customSection': {
              const { fields, sys } = column as ICustomSection;
              const { primaryImage, imagePlacement, partnersLogos } = fields;

              return (
                <RowContainer key={sys.id}>
                  <ColumnSectionLayout
                    additionalContentPlacement={imagePlacement}
                    image={primaryImage}
                    partnersList={partnersLogos}
                    {...fields}
                  />
                </RowContainer>
              );
            }
            default:
              return <UnsupportedSection section={column} />;
          }
        })}
      </CardsContainer>
    </Wrapper>
  );
};

export default MultiRowsSectionLayout;
