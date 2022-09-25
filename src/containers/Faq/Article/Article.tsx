import { NextPage } from 'next';
import { Entry, EntryCollection } from 'contentful';
import {
  IGlobalSettingsFields,
  IBanner,
  IFaqSectionFields,
  IFaqFields,
} from '../../../interfaces/contentful.types.generated';
import { DefaultLayout } from '../../../layouts';
import { Banner, Heading, RichTextRenderer, StyledLink } from '../../../elements';
import {
  AnswerWraper,
  OtherArticlesWrapper,
  QuestionPageWrapper,
  QuestionWrapper,
  OtherArticles,
  Wrapper,
  FaqLink,
} from './Article.styled';
import { ArrowRightIcon } from '../../../icons';

export interface PageProps {
  article: EntryCollection<IFaqFields>;
  articleSection: Entry<IFaqSectionFields>;
  banner?: IBanner;
  globalSettings: Entry<IGlobalSettingsFields>;
}

const Article: NextPage<PageProps> = ({ article, articleSection, banner, globalSettings }) => {
  const { answer, question, category } = article.items[0].fields;
  return (
    <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle={question}>
      <Wrapper>
        <QuestionPageWrapper>
          <QuestionWrapper>
            <StyledLink href={{ pathname: '/faqs', query: { tab: category } }}>
              {category} FAQs
            </StyledLink>
            <Heading variant="h2">{question}</Heading>
            <AnswerWraper>
              <RichTextRenderer>{answer}</RichTextRenderer>
            </AnswerWraper>
          </QuestionWrapper>
          <OtherArticlesWrapper>
            <OtherArticles>
              <Heading variant="h4">Other articles in this section</Heading>
              {articleSection?.fields?.questions?.map((q) => (
                <FaqLink color="primary" href={`/faqs/${q.fields.urlSlug}`} key={q.sys.id}>
                  <ArrowRightIcon />
                  {q.fields.question}
                </FaqLink>
              ))}
            </OtherArticles>
          </OtherArticlesWrapper>
        </QuestionPageWrapper>
        {banner && <Banner {...banner.fields} />}
      </Wrapper>
    </DefaultLayout>
  );
};

export default Article;
