import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SubscribeCustomerPopup } from '../../../../../elements';
import BusinessActionsWrapper from './BusinessActions.styled';

const BusinessActions = () => (
  <BusinessActionsWrapper>
    <ReactHTMLTableToExcel
      buttonText="Export"
      className="exportButton"
      filename="customersXLS"
      sheet="customers"
      table="customersTable"
    />
    <SubscribeCustomerPopup />
  </BusinessActionsWrapper>
);

export default BusinessActions;
