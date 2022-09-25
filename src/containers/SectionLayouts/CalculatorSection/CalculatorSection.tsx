import { CompactSavingsCalculator } from '../../../elements';
import { AdvancedSavingsCalculator } from '../../../elements/Calculators';
import { ICalculatorSectionFields } from '../../../interfaces/contentful.types.generated';

const CalculatorSection = ({ ...fields }: ICalculatorSectionFields) => {
  switch (fields.type) {
    case 'Savings - Advanced':
      return <AdvancedSavingsCalculator {...fields} />;
    case 'Savings - Compact':
      return <CompactSavingsCalculator {...fields} />;
    default:
      return null;
  }
};

export default CalculatorSection;
