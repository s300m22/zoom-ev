import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import Skeleton from 'react-loading-skeleton';
import { Heading } from '../../../../../elements';
import { CarSliderWrapper, NextArrowWrapper } from './CarSlider.styled';
import CarCard, { CarProps } from '../../../../../elements/CarCard/CarCard';
import { NextIcon } from '../../../../../icons';

const Slider = dynamic(import('react-slick'), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextArrow = (props: any) => (
  <NextArrowWrapper {...props}>
    <NextIcon />
  </NextArrowWrapper>
);

const settings = {
  dots: false,
  arrows: true,
  speed: 1500,
  slidesToShow: 3,
  variableWidth: true,
  draggable: true,
  swipeToSlide: true,
  prevArrow: <></>,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

interface CarSliderProps {
  loading: boolean;
  cars?: Array<CarProps>;
  sectionTitle: string;
}

const CarSlider = ({ loading, cars, sectionTitle }: CarSliderProps) => (
  <CarSliderWrapper>
    {cars && cars.length && <Heading variant="h2">{sectionTitle}</Heading>}
    {loading ? (
      <Slider {...settings}>
        {Array.from(Array(6).keys()).map((i) => (
          <Skeleton
            count={1}
            height={375}
            key={i}
            style={{
              padding: '10px',
              borderRadius: '12px',
              boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
            }}
            width={352}
          />
        ))}
      </Slider>
    ) : (
      <Slider {...settings}>
        {cars?.map((car: CarProps) => (
          <CarCard key={car.id} {...car} />
        ))}
      </Slider>
    )}
  </CarSliderWrapper>
);

export default CarSlider;
