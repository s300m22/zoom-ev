import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import { ICustomSectionFields } from '../../../../interfaces/contentful.types.generated';
import PartnersCarouselWrapper from './PartnersCarouselSectionLayout.styled';
import { Image } from '../../../../elements';

const Slider = dynamic(import('react-slick'), {
  ssr: false,
});

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 1500,
  slidesToShow: 7,
  slidesToScroll: 1,
  variableWidth: true,
  initialSlide: -40,
  draggable: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const PartnersCarouselSectionLayout = ({
  partnersLogos,
  background = 'light',
}: ICustomSectionFields) => {
  return partnersLogos ? (
    <PartnersCarouselWrapper background={background}>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5].map(() =>
          partnersLogos?.map((logo) => <Image asset={logo} key={logo.sys.id} />),
        )}
      </Slider>
    </PartnersCarouselWrapper>
  ) : null;
};

export default PartnersCarouselSectionLayout;
