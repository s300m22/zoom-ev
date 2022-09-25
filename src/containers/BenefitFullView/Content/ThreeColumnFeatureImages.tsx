import { Asset } from 'contentful';
import React from 'react';
import { Image, RichTextRenderer } from '../../../elements';
import { IBenefitContent3ColumnImagesWithText } from '../../../interfaces/contentful.types.generated';
import { GreenLine } from '../BenefitFullView.styled';

const ThreeColumnFeatureImages: React.FC<IBenefitContent3ColumnImagesWithText> = (component) => {
  const { fields } = component;

  // @todo validate that all the fields here are filled or throw an error message
  return (
    <div className="three-images-feature">
      <h3 className="component-title">{fields.title}</h3>
      <GreenLine />
      <RichTextRenderer>{fields.description}</RichTextRenderer>

      <div className="items">
        <div className="item">
          <div className="image">
            <Image asset={fields.item1Image as Asset} />
          </div>
          <RichTextRenderer>{fields.item1Content}</RichTextRenderer>
        </div>
        <div className="item">
          <Image asset={fields.item2Image as Asset} />
          <RichTextRenderer>{fields.item2Content}</RichTextRenderer>
        </div>
        <div className="item">
          <Image asset={fields.item3Image as Asset} />
          <RichTextRenderer>{fields.item3Content}</RichTextRenderer>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnFeatureImages;
