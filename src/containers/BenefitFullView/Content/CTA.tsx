import React from 'react';
import { Button, List, RichTextRenderer } from '../../../elements';
import { IBenefitContent3ColumnImagesWithText } from '../../../interfaces/contentful.types.generated';
import { GreenLine } from '../BenefitFullView.styled';

const BenefitCta: React.FC<IBenefitContent3ColumnImagesWithText> = (component) => {
  const { fields } = component;

  // @todo validate that all the fields here are filled or throw an error message
  return (
    <div className="cta">
      <h3 className="component-title">{fields.title}</h3>
      <GreenLine />
      <div className="content">
        <RichTextRenderer>{fields.description}</RichTextRenderer>
        {fields.features && (
          <List
            listColumns={1}
            listItems={fields.features?.map((bFeature) => (
              <div className="list-item" key={bFeature.sys.id}>
                <h2>{bFeature.fields.title}</h2>
                <p>{bFeature.fields.description ?? bFeature.fields.shortDescription}</p>
              </div>
            ))}
            listTitle=""
          />
        )}
      </div>
      {fields.cta && <Button link={fields.cta} />}
    </div>
  );
};

export default BenefitCta;
