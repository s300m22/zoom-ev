import Skeleton from 'react-loading-skeleton';

const PriceSkeleton = ({ width = 35, height = 25 }) => (
  <Skeleton
    count={1}
    height={height}
    style={{
      marginBottom: '10px',
      borderRadius: '12px',
      boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
    }}
    width={width}
  />
);

export default PriceSkeleton;
