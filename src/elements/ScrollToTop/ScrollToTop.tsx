import React, { useEffect, useState } from 'react';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import { Wrapper } from './ScrollToTop.styled';
const ScrollToTop: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [screenHeight, setScreenHeight] = useState(600);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    setScreenHeight(window.innerHeight);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });

    // when in a benefit view scroll that container instead
    const myDiv = document.getElementById('benefit-full-view');
    myDiv?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {offset > screenHeight * 4 && (
        <Wrapper onClick={onClick}>
          <ArrowUpIcon />
          <span>Back to top</span>
        </Wrapper>
      )}
    </>
  );
};

export default ScrollToTop;
