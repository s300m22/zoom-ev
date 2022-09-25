import Tooltip from '../Tooltip';
import VinTipContent from './VinTooltip.styled';

const VinTooltip = () => (
  <Tooltip
    content={
      <VinTipContent>
        VIN is a barcode with a 17 character number that can be found:
        <ul>
          <li>on driver’s side dashboard that you can see through windshield</li>
          <li>on driver’s Side Door Jamp</li>
          <li>on Vehicle’s Insurance Card</li>
        </ul>
      </VinTipContent>
    }
  />
);

export default VinTooltip;
