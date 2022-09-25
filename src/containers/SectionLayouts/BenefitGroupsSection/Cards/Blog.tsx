import React, { useRef } from 'react';
import { Button } from '../../../../elements';
import { ArrowRightIconAlt } from '../../../../icons';
import { IBlogPost } from '../../../../interfaces/contentful.types.generated';
import { BlogCardWrapper } from '../BenefitGroupsSection.styled';

const BlogCard: React.FC<IBlogPost> = ({ fields, sys }) => {
  const buttonRef = useRef<HTMLInputElement>();
  return (
    <BlogCardWrapper
      onClick={() => {
        buttonRef.current?.click();
      }}
    >
      <h3>Blog</h3>
      <p>{fields.title}</p>

      <div className="read-more">
        <Button
          analyticsData={{
            title: 'Read Blog',
            post: { id: sys.id, title: fields.title, slug: fields.slug },
          }}
          href={`/blog/${fields.slug}`}
          ref={buttonRef}
          variant="text"
        >
          Read blog <ArrowRightIconAlt className="icon" />
        </Button>
      </div>
    </BlogCardWrapper>
  );
};

export default BlogCard;
