const isProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';

export default isProduction;
