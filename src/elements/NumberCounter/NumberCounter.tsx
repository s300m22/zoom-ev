import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks';
import NumberCounterWrapper from './NumberCounter.styled';

export interface NumberCounterProps {
  countTo: number;
  duration?: number;
}

const NumberCounter = ({ duration = 5000, countTo }: NumberCounterProps) => {
  const [count, setCount] = useState('0');
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterEntry = useIntersectionObserver(counterRef, {});
  const isIntersecting = counterEntry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting && parseInt(count, 10) === 0) {
      let start = 0;
      const end = countTo.toString();
      if (start >= countTo) return;
      const incrementStep = end.length * 3;
      const incrementTime = (duration / countTo) * incrementStep;

      const timer = setInterval(() => {
        start += incrementStep;
        setCount(String(start));
        if (start >= countTo) {
          clearInterval(timer);
        }
      }, incrementTime);
    }
  }, [isIntersecting, countTo, duration, count]);

  return <NumberCounterWrapper ref={counterRef}>{count}</NumberCounterWrapper>;
};

export default NumberCounter;
