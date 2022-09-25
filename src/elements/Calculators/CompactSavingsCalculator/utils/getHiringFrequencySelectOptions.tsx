const getHiringFrequencySelectOptions = (maxFrequencyPerWeek: number) =>
  [...Array(maxFrequencyPerWeek)].map((_, index) => {
    const value = index + 1;
    return (
      <div data-value={value} key={value}>
        {value} times/week
      </div>
    );
  });

export default getHiringFrequencySelectOptions;
