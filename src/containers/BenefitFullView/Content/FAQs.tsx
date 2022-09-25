import React, { useState } from 'react';
import { Button, RichTextRenderer } from '../../../elements';
import { MinusIconCircle } from '../../../icons';
import PlusIconCircle from '../../../icons/PlusIconCircle';
import { IFaqSection } from '../../../interfaces/contentful.types.generated';
import { GreenLine } from '../BenefitFullView.styled';

const BenefitFAQs: React.FC<IFaqSection> = ({ fields }) => {
  const [activeIndex, setActiveIndex] = useState(fields.questions.length > 0 ? 0 : undefined);
  return (
    <div className="faqs">
      <h3 className="component-title">{fields.title}</h3>
      <GreenLine />

      {fields.questions.map((question, index) => (
        <div className="question" key={question.sys.id}>
          <div className="left">
            <h5>{question.fields.question}</h5>
            {activeIndex === index && (
              <div className="content">
                <RichTextRenderer>{question.fields.answer}</RichTextRenderer>
              </div>
            )}
          </div>
          <div
            className="icon"
            onClick={() => {
              if (activeIndex === index) {
                setActiveIndex(undefined);
              } else {
                setActiveIndex(index);
              }
            }}
            role="button"
            tabIndex={0 + index}
          >
            {activeIndex === index ? <MinusIconCircle /> : <PlusIconCircle />}
          </div>
        </div>
      ))}

      {fields.linkUnderneath && (
        <>
          <br />
          <Button link={fields.linkUnderneath}></Button>
        </>
      )}
    </div>
  );
};

export default BenefitFAQs;
