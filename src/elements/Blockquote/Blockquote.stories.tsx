import { Story, Meta } from '@storybook/react/types-6-0';
import Blockquote, { BlockquoteProps } from './Blockquote';

export default {
  title: 'Elements/Blockquote',
  component: Blockquote,
} as Meta;

const Template: Story<BlockquoteProps> = (args) => <Blockquote {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <blockquote className="Blockquotestyled__Wrapper-gmt11-0 hFdRcm">
      <p>
        <i>
          I can control my destiny, but not my fate. Destiny means there are opportunities to turn
          right or left, but fate is a one-way street. I believe we all have the choice as to
          whether we fulfil our destiny, but our fate is sealed.
        </i>
        <br />
        <br />
        <b>
          Paulo Coelho
          <br />
        </b>
        <code>Rio de Janeiro</code>
      </p>
    </blockquote>
  ),
};
