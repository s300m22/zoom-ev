import mixpanel from 'mixpanel-browser';
import React from 'react';
import { Button, Image } from '../../elements';
import { useMediaDevice } from '../../hooks';
import {
  IBenefit,
  IBenefitChargerComparisonTable,
} from '../../interfaces/contentful.types.generated';
import { Table, Wrapper } from './ChargerComparisonTable.styled';

interface CCT extends IBenefitChargerComparisonTable {
  onBenefitSelect: (benefit: IBenefit) => void;
}
const ChargerComparisonTable: React.FC<CCT> = ({ fields, onBenefitSelect }) => {
  const { isMobile, isTablet } = useMediaDevice();

  return (
    <Wrapper>
      {isMobile || isTablet ? (
        <>
          <Table className="mobile">
            <thead>
              <tr>
                <th>Brands</th>
                <th>Benefit</th>
                <th>Starting Price</th>
                <th>Key Features</th>
                <th>Speed</th>
                <th>Typical Installation Time</th>
                <th>Warranty</th>
                <th>Payment Plan</th>
                <th>Tethered (with cable) Option</th>
              </tr>
            </thead>
            <tbody>
              {fields.options.map((field) => (
                <tr
                  className={`${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={field.sys.id}
                >
                  <td className="tr-logo">
                    <div className="logoish">
                      <Image asset={field.fields.benefit.fields.logo} />
                    </div>
                  </td>
                  <td className={`field`}>{field.fields.mainBenefit}</td>
                  <td className={`field`}>{field.fields.startingPrice}</td>
                  <td className={`field`}>{field.fields.keyFeatures}</td>
                  <td className={`field`}>{field.fields.speed}</td>
                  <td className={`field`}>{field.fields.typicalInstallationTime}</td>
                  <td className={`field`}>{field.fields.warranty}</td>
                  <td className={`field`}>{field.fields.paymentPlan}</td>
                  <td className={`field`}>{field.fields.tetheredWithCableOption}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Table>
          <thead>
            <tr className="first">
              <th></th>
              {fields.options.map((field) => (
                <th
                  className={`head ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`blank-${field.sys.id}`}
                ></th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="tr-logo">
              <th>Brands</th>
              {fields.options.map((field) => (
                <td
                  className={`th-logo ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`logo-${field.sys.id}`}
                >
                  {field.fields.isMostPopular && <div className="mptitle">Most popular</div>}
                  <div className="logoish">
                    <Image asset={field.fields.benefit.fields.logo} />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <th>Benefit</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`benefit-${field.sys.id}`}
                >
                  {field.fields.mainBenefit}
                </td>
              ))}
            </tr>
            <tr>
              <th>Starting Price</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`starting-price-${field.sys.id}`}
                >
                  {field.fields.startingPrice}
                </td>
              ))}
            </tr>
            <tr>
              <th>Key Features</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`kf-${field.sys.id}`}
                >
                  {field.fields.keyFeatures}
                </td>
              ))}
            </tr>
            <tr>
              <th>Speed</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`speed-${field.sys.id}`}
                >
                  {field.fields.speed}
                </td>
              ))}
            </tr>
            <tr>
              <th>Typical Installation Time</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`tit-${field.sys.id}`}
                >
                  {field.fields.typicalInstallationTime}
                </td>
              ))}
            </tr>
            <tr>
              <th>Warranty</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`warranty-${field.sys.id}`}
                >
                  {field.fields.warranty}
                </td>
              ))}
            </tr>
            <tr>
              <th>Payment Plan</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`pp-${field.sys.id}`}
                >
                  {field.fields.paymentPlan}
                </td>
              ))}
            </tr>
            <tr>
              <th>Tethered (with cable) Option</th>
              {fields.options.map((field) => (
                <td
                  className={`field ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`pp-${field.sys.id}`}
                >
                  {field.fields.tetheredWithCableOption}
                </td>
              ))}
            </tr>
            <tr className="last">
              <th></th>
              {fields.options.map((field) => (
                <td
                  className={`action ${field.fields.isMostPopular === true ? 'mp' : ''}`}
                  key={`action-${field.sys.id}`}
                >
                  <Button
                    onClick={() => {
                      mixpanel.track('benefits.comparison_table.view_benefit', {
                        benefit: field.fields.benefit,
                      });
                      onBenefitSelect(field.fields.benefit);
                    }}
                  >
                    Find out more
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
};

export default ChargerComparisonTable;
