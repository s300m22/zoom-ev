import Masonry from 'react-masonry-css';
import Heading from '../../../Heading';
import { IFaqSectionFields, ITabFields } from '../../../../interfaces/contentful.types.generated';
import { FaqCard, FaqLink, FaqTabWrapper } from './FaqTab.styled';
import { ArrowRightIcon } from '../../../../icons';

const breakpointColumnsObj = {
  default: 2,
  960: 1,
};

const FaqTab = ({ tab }: { tab: ITabFields }) => {
  const { sections } = tab;

  return (
    <FaqTabWrapper>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid__column"
      >
        {sections?.map((section) => {
          const { title, questions } = section.fields as IFaqSectionFields;
          return (
            <FaqCard key={section.sys.id}>
              <Heading variant="h4">{title}</Heading>
              {questions?.map((question) => (
                <FaqLink
                  color="primary"
                  href={`/faqs/${question.fields.urlSlug}`}
                  key={question.sys.id}
                >
                  <ArrowRightIcon />
                  <div>{question.fields.question}</div>
                </FaqLink>
              ))}
            </FaqCard>
          );
        })}
      </Masonry>
    </FaqTabWrapper>
  );
};

export default FaqTab;
