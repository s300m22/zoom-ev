import { IAuthor } from '../../interfaces/contentful.types.generated';
import Avatar from '../Avatar/Avatar';
import {
  AuthorDetails,
  AuthorLocation,
  TestimonialWrapper,
  TestimonialQuote,
} from './Testimonial.styled';

export interface TestimonialProps {
  quote: string;
  author: IAuthor;
}

const Testimonial = ({ quote, author }: TestimonialProps) => {
  const { firstName, lastName, location, avatar } = author.fields;
  return (
    <TestimonialWrapper>
      <Avatar avatar={avatar} variant="testimonial" />
      {quote && <TestimonialQuote>{quote}</TestimonialQuote>}
      <AuthorDetails>
        <strong>
          {firstName} {lastName}
        </strong>
        <AuthorLocation>{location}</AuthorLocation>
      </AuthorDetails>
    </TestimonialWrapper>
  );
};
export default Testimonial;
