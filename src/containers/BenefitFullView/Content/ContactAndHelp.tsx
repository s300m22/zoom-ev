import React from 'react';
import { ClockIcon, MailIcon } from '../../../icons';
import TelIcon from '../../../icons/TelIcon';
import { IBenefitContent3ColumnImagesWithText } from '../../../interfaces/contentful.types.generated';
import { GreenLine } from '../BenefitFullView.styled';

const BenefitContactAndHelp: React.FC<IBenefitContent3ColumnImagesWithText> = ({ fields }) => {
  return (
    <div className="contact-and-help">
      <h3 className="component-title">{fields.title}</h3>
      <GreenLine />

      {fields.contactCards?.map((card) => (
        <div className="card-holder" key={card.sys.id}>
          <div className="details">
            <h5>{card.fields.title}</h5>
            {card.fields.email && (
              <a href={`mailto://${card.fields.email}`}>
                <MailIcon /> {card.fields.email}
              </a>
            )}
            {card.fields.phone && (
              <a href={`tel://${card.fields.phone}`}>
                <TelIcon />
                {card.fields.phone}
              </a>
            )}
          </div>
          <div className="hours">
            <ClockIcon />
            <h5>Phone Lines Open</h5>

            {card.fields.hoursItems?.map((itm) => (
              <p className="oh-item" key={itm}>
                {itm}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitContactAndHelp;
