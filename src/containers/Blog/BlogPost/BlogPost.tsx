import { Entry } from 'contentful';
import Link from 'next/link';
import {
  IBlogPostFields,
  IGlobalSettingsFields,
  INavigationLink,
} from '../../../interfaces/contentful.types.generated';
import { DefaultLayout } from '../../../layouts';
import { Heading, Image, RichTextRenderer, ShareBanner } from '../../../elements';
import {
  BlogPostWrapper,
  MainContent,
  Thumbnail,
  HeaderContainer,
  HeaderContent,
  Tags,
  Tag,
  PostBody,
  OtherPostsContainer,
  AuthorCaption,
} from './BlogPost.styled';
import { ColumnsSectionLayout } from '../../SectionLayouts';

export interface BlogPostProps {
  blogPost: Entry<IBlogPostFields>;
  globalSettings: Entry<IGlobalSettingsFields>;
}

const BlogPost = ({ blogPost, globalSettings }: BlogPostProps) => {
  const { title, body, thumbnail, tags, author, recommendedOtherPosts } = blogPost.fields;

  const { createdAt } = blogPost.sys;
  const dateOptions = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;

  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date(createdAt));

  return (
    <BlogPostWrapper>
      <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle={`Blog - ${title}`}>
        <HeaderContainer>
          <Thumbnail>
            <Image asset={thumbnail} />
          </Thumbnail>
          <HeaderContent>
            <Heading variant="h2">{title}</Heading>
            <Tags>
              {tags?.length &&
                tags.map(({ fields, sys }) => (
                  <Link href={{ pathname: '/blog', query: { tag: fields.label } }} key={sys.id}>
                    <Tag variant="link">{fields.label}</Tag>
                  </Link>
                ))}
            </Tags>
          </HeaderContent>
        </HeaderContainer>
        <MainContent>
          <ShareBanner />
          <PostBody>
            <RichTextRenderer>{body}</RichTextRenderer>
          </PostBody>
          <div>
            <AuthorCaption>
              Written by {author.fields.firstName} {author.fields.lastName}
            </AuthorCaption>
            <p>{formattedDate}</p>
          </div>
        </MainContent>
        {recommendedOtherPosts && (
          <OtherPostsContainer>
            <ColumnsSectionLayout
              columns={recommendedOtherPosts}
              ctaButton={
                {
                  fields: {
                    label: 'Explore our blog',
                    customUrl: '/blog',
                  },
                } as INavigationLink
              }
              layout="3 columns"
              title="Blog"
              titlePosition="center"
            />
          </OtherPostsContainer>
        )}
      </DefaultLayout>
    </BlogPostWrapper>
  );
};

export default BlogPost;
