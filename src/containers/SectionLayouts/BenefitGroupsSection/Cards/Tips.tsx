import React, { ReactNode } from 'react';
import { IBenefitGroupTips } from '../../../../interfaces/contentful.types.generated';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { TipCardWrapper } from '../BenefitGroupsSection.styled';

const settings = {
  dots: true,
  arrows: false,
  autoplay: true,
  speed: 350,
  autoplaySpeed: 7500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  appendDots: (dots: ReactNode) => <div>{dots}</div>,
  customPaging: () => (
    <div className="ft-slick__dots--custom">
      <div className="loading" />
    </div>
  ),
};

const TipCard: React.FC<IBenefitGroupTips> = ({ fields }) => {
  return (
    <TipCardWrapper>
      <h3>{fields.title}</h3>
      <Slider {...settings}>
        {fields.tips?.map((tip) => (
          <div className="tip" key={tip}>
            {tip}
          </div>
        ))}
      </Slider>
    </TipCardWrapper>
  );
};

export default TipCard;
