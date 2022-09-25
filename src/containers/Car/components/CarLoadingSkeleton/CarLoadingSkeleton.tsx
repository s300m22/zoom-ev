import Skeleton from 'react-loading-skeleton';
import { CarWrapper } from '../../Car.styled';

const CarLoadingSkeleton = () => (
  <CarWrapper>
    <div>
      <Skeleton
        count={1}
        height={658}
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={784}
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </div>
    <div>
      <Skeleton
        count={1}
        height={435}
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={349}
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </div>
  </CarWrapper>
);

export default CarLoadingSkeleton;
