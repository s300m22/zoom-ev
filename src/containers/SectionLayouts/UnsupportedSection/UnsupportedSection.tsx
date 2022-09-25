import Preformatted from './UnsupportedSection.styled';
import { isProduction } from '../../../utils';

interface UnsupportedSectionProps {
  section: unknown;
}

const UnsupportedSection = ({ section }: UnsupportedSectionProps) => {
  return isProduction ? null : (
    <>
      <h2>Unsupported Section</h2>
      <Preformatted>
        <code>{JSON.stringify(section, undefined, 2)}</code>
      </Preformatted>
    </>
  );
};

export default UnsupportedSection;
