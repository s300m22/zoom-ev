const formatPrice = (number?: number, fractions = 2): string | null => {
  if (!number && number !== 0) return null;
  if (number > Number.MAX_SAFE_INTEGER) return 'Oh, really?';
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: fractions,
    minimumFractionDigits: 2,
  })
    .format(number)
    .replace(/\D00(?=\D*$)/, '');
};

export default formatPrice;
