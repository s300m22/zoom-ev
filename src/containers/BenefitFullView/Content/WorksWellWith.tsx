import React from 'react';
import { Image, RichTextRenderer } from '../../../elements';
import { ArrowRightIconAlt } from '../../../icons';
import {
  IBenefit,
  IBenefitContent3ColumnImagesWithText,
} from '../../../interfaces/contentful.types.generated';
import { GreenLine } from '../BenefitFullView.styled';
interface TheProps extends IBenefitContent3ColumnImagesWithText {
  onOpenWorksWithBenefit: (benefit: IBenefit) => void;
}
const BenefitWorksWellWith: React.FC<TheProps> = ({ fields, onOpenWorksWithBenefit }) => {
  return (
    <div className="works-well-with">
      <h3 className="component-title">{fields.title}</h3>
      <GreenLine />
      <RichTextRenderer>{fields.description}</RichTextRenderer>
      <div className="benefits">
        {fields.worksWellWithItems &&
          fields.worksWellWithItems
            // @ts-expect-error this could potentially become an infinite loop if the same component is used.
            .filter((ff) => ff.sys?.circular !== true)
            .map((wwI) => (
              <div className="benefit" key={wwI.sys.id}>
                <div className="cover">
                  <Image asset={wwI.fields.benefit.fields.headerImage} />
                </div>
                <div className="logo">
                  <Image asset={wwI.fields.benefit.fields.logo} />
                </div>
                <p>{wwI.fields.description}</p>
                <div
                  className="read-more"
                  onClick={() => {
                    onOpenWorksWithBenefit(wwI.fields.benefit);
                  }}
                  role="button"
                  tabIndex={-1}
                >
                  <span>Read More</span> <ArrowRightIconAlt />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BenefitWorksWellWith;
