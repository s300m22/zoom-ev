import React from 'react';
import { Image } from '../../../../elements';
import { ArrowRightIconAlt } from '../../../../icons';
import { IBenefit } from '../../../../interfaces/contentful.types.generated';
import {
  BenefitBottomLabel,
  BenefitCard as BenefitCardStyled,
  BenefitLogo,
} from '../BenefitGroupsSection.styled';

interface CardProps extends IBenefit {
  onClick: () => void;
}
const BenefitCard: React.FC<CardProps> = ({ fields, sys, onClick }) => {
  return (
    <BenefitCardStyled key={sys.id} onClick={onClick}>
      <div
        className="inner"
        style={{
          backgroundImage: 'url("/images/patterns/pattern_4.svg")',
          backgroundSize: 'cover',
        }}
      >
        <BenefitLogo>
          <Image asset={fields.logo} />
        </BenefitLogo>

        {fields.features?.map((bFeature) => (
          <div className="feature" key={bFeature.sys.id}>
            <strong>{bFeature.fields.title}</strong>
            <p>{bFeature.fields.shortDescription}</p>
          </div>
        ))}
        {fields.label && <BenefitBottomLabel>{fields.label}</BenefitBottomLabel>}
        <div className="floating-arrow">
          <ArrowRightIconAlt />
        </div>
      </div>
    </BenefitCardStyled>
  );
};

export default BenefitCard;
