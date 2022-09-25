import { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { Heading, Testimonial } from '../../../../elements';
import { ICustomSectionFields } from '../../../../interfaces/contentful.types.generated';
import SectionContainer from './TestimonialsSectionLayout.styled';

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

export const TestimonialsSectionLayout = ({
  title,
  primaryImage,
  testimonials,
}: ICustomSectionFields) => (
  <SectionContainer backgroundImage={primaryImage || ''}>
    <Heading variant="h2">{title}</Heading>
    <Slider {...settings}>
      {testimonials?.map((testimonial) => (
        <Testimonial
          author={testimonial.fields.author}
          key={testimonial.sys.id}
          quote={testimonial.fields.quote}
        />
      ))}
    </Slider>
  </SectionContainer>
);
export default TestimonialsSectionLayout;
