import React, { useEffect, useState, useRef } from 'react';
import { Entry } from 'contentful';
import { useRouter } from 'next/router';
import {
  IBlogPostFields,
  IGlobalSettingsFields,
} from '../../../interfaces/contentful.types.generated';
import { MultipleColumnsItemLayout } from '../../SectionLayouts';
import {
  CategoriesCard,
  CategoriesCardHeader,
  CategoriesExpand,
  CategoryItem,
  PageHeaderWrapper,
  MainContent,
  NoArticlesWrapper,
  PostsList,
  PostsWrapper,
  Wrapper,
} from './BlogPostsList.styled';
import { Button, Heading } from '../../../elements';
import { DefaultLayout } from '../../../layouts';
import { useMediaDevice } from '../../../hooks';

export interface BlogPostsListProps {
  blogPosts: Array<Entry<IBlogPostFields>>;
  title: string;
  globalSettings: Entry<IGlobalSettingsFields>;
}

const BlogPostsList = ({ blogPosts, title, globalSettings }: BlogPostsListProps) => {
  const {
    fields: { blogCategories },
  } = globalSettings;
  const pageSize = 8;
  const allCategoriesTagLabel = 'All categories';
  const router = useRouter();
  const { isMobile, isTablet } = useMediaDevice();
  const queryCategory = router.query.tag as string;
  const [paginationOffset, setPaginationOffset] = useState(pageSize);
  const [hasMorePosts, setHasMorePosts] = useState(blogPosts.length > pageSize);
  const [categoriesExpand, setCategoriesExpand] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const [filteredPosts, setFilteredPosts] = useState<Array<Entry<IBlogPostFields>>>(
    blogPosts.slice(0, pageSize),
  );
  const [selectedCategory, setSelectedCategory] = useState({
    label: queryCategory || allCategoriesTagLabel,
    id: '',
  });

  useEffect(() => {
    let posts;
    if (selectedCategory.label === allCategoriesTagLabel) {
      posts = blogPosts;
    } else {
      posts = blogPosts.filter(({ fields }) => {
        const foundTag = fields.tags?.find(
          ({ fields: { label } }) => label === selectedCategory.label,
        );
        return Boolean(foundTag);
      });
    }
    setFilteredPosts(posts.slice(0, paginationOffset));
    setHasMorePosts(posts.length > paginationOffset);
  }, [blogPosts, filteredPosts.length, paginationOffset, selectedCategory]);

  return (
    <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle={title}>
      <Wrapper>
        <PageHeaderWrapper ref={headingRef}>
          <Heading variant="h1">{title}</Heading>
        </PageHeaderWrapper>
        <MainContent>
          <PostsWrapper>
            {filteredPosts.length ? (
              <PostsList>
                {filteredPosts.map(({ fields, sys }) => (
                  <MultipleColumnsItemLayout
                    description={fields.body}
                    image={fields.thumbnail}
                    imageMaxWidth="450"
                    key={sys.id}
                    readMoreLink={`/blog/${fields.slug}`}
                    title={fields.title}
                  />
                ))}
              </PostsList>
            ) : (
              <NoArticlesWrapper>
                <Heading variant="h5">There are no articles in this category</Heading>
              </NoArticlesWrapper>
            )}
            {hasMorePosts && (
              <Button onClick={() => setPaginationOffset(paginationOffset + 8)} variant="outlined">
                Load more
              </Button>
            )}
          </PostsWrapper>
          <CategoriesCard
            expanded={categoriesExpand}
            onClick={() => {
              setCategoriesExpand(!categoriesExpand);
              headingRef.current && headingRef.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <CategoriesExpand expanded={categoriesExpand} />
            <CategoriesCardHeader>
              <Heading variant="h4">
                {isMobile || isTablet ? selectedCategory.label : 'Blog categories'}
              </Heading>
            </CategoriesCardHeader>
            <CategoryItem
              onClick={() =>
                setSelectedCategory({
                  label: allCategoriesTagLabel,
                  id: '',
                })
              }
              selected={selectedCategory.label === allCategoriesTagLabel}
            >
              {allCategoriesTagLabel}
            </CategoryItem>
            {blogCategories?.map(({ fields: { label }, sys }) => (
              <CategoryItem
                key={sys.id}
                onClick={() =>
                  setSelectedCategory({
                    label,
                    id: sys.id,
                  })
                }
                selected={selectedCategory.label === label}
              >
                {label}
              </CategoryItem>
            ))}
          </CategoriesCard>
        </MainContent>
      </Wrapper>
    </DefaultLayout>
  );
};

export default BlogPostsList;
