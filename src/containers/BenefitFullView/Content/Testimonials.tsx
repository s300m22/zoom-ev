import React, { ReactNode } from 'react';
import { IBenefitContent3ColumnImagesWithText } from '../../../interfaces/contentful.types.generated';
import { GreenLine } from '../BenefitFullView.styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { TestimonialGraphic } from '../../../icons';
import { Image } from '../../../elements';

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
const BenefitTestimonials: React.FC<IBenefitContent3ColumnImagesWithText> = (component) => {
  const { fields } = component;

  // @todo validate that all the fields here are filled or throw an error message
  return (
    <div className="testimonials">
      <h3 className="component-title">{fields.title}</h3>
      <GreenLine />

      <div className="slider-wrapper">
        <Slider {...settings}>
          {fields.testimonials?.map((testimonial) => (
            <div className="testimonial" key={testimonial.sys.id}>
              <div className="inner">
                {testimonial.fields?.author.fields?.avatar ? (
                  <Image asset={testimonial.fields.author.fields.avatar} />
                ) : (
                  <TestimonialGraphic />
                )}
                <div>
                  <div className="content">{testimonial.fields.quote}</div>
                  <div className="author">
                    <strong>
                      {testimonial.fields.author.fields.firstName}{' '}
                      {testimonial.fields.author.fields.lastName}
                    </strong>
                    {testimonial.fields.author.fields.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BenefitTestimonials;
