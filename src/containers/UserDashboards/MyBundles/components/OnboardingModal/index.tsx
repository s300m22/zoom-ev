import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Background, InnerContainer } from './OnboardingModal.styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { Button, Image } from '../../../../../elements';
import mixpanel from 'mixpanel-browser';

const slides = [
  {
    image: '/images/bundle-onboarding/slide-1.jpg',
    title: 'Browse your EV benefits',
    desc: 'and select any you want to access (as many or as few as you’d like!)',
    last: false,
  },
  {
    image: '/images/bundle-onboarding/slide-2.jpg',
    title: 'Activate a benefit with your Zoom EV code',
    desc: 'Follow the instructions per partner',
    last: false,
  },
  {
    image: '/images/bundle-onboarding/slide-3.jpg',
    title: 'Speak to our EV experts if you need help',
    desc: 'Request a call if you need any help or advice, we are here to help you go electric!',
    last: true,
  },
];
const OnboardingModal: React.FC = () => {
  const sliderRef = useRef();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflow = '';
    }
  }, [shown]);

  const checkShown = useCallback(() => {
    const bobShown = window.localStorage.getItem('bundleOnBoardingShown');

    if (bobShown !== 'true') {
      setShown(true);
    }
  }, []);

  useEffect(() => {
    checkShown();
  }, [checkShown]);

  const onComplete = () => {
    setShown(false);
    window.localStorage.setItem('bundleOnBoardingShown', 'true');
  };

  const settings = {
    dots: true,
    arrows: false,
    autoplay: false,
    draggable: false,
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
    beforeChange: (oldIndex: number, newIndex: number) => {
      if (oldIndex == 2 && newIndex == 0) {
        mixpanel.track('benefits.onboarding.completed', {});
        onComplete();
      }
    },
  };

  if (!shown) return <></>;
  return (
    <Background>
      <InnerContainer>
        {/*  @ts-expect-error slick is weird */}
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => (
            <div className="slide" key={`ob-slide-${index}`}>
              <div className="slide-image">
                <Image asset={slide.image} />
              </div>
              <div className="body">
                <h3>{slide.title}</h3>
                <p>{slide.desc}</p>
                <Button
                  onClick={() => {
                    // @ts-expect-error slick is weird
                    sliderRef?.current?.slickNext();
                  }}
                >
                  {index == slides.length - 1 ? 'Close' : 'Next'}
                </Button>
              </div>
              {index !== slides.length - 1 && (
                <div
                  className="skippith"
                  onClick={() => {
                    mixpanel.track('benefits.onboarding.skipped', {});
                    onComplete();
                  }}
                  role="button"
                  tabIndex={-1}
                >
                  Skip
                </div>
              )}
            </div>
          ))}
        </Slider>
      </InnerContainer>
    </Background>
  );
};

export default OnboardingModal;
