---
to: src/elements/<%= h.changeCase.pascal(Name) %>/<%= h.changeCase.pascal(Name) %>.tsx
---
import { ReactNode } from 'react';
import Wrapper from './<%= h.changeCase.pascal(Name) %>.styled';

export interface <%= h.changeCase.pascal(Name) %>Props {
  children?: ReactNode;
}

const <%= h.changeCase.pascal(Name) %> = ({ children }: <%= h.changeCase.pascal(Name) %>Props) => <Wrapper>{children}</Wrapper>;

export default <%= h.changeCase.pascal(Name) %>;
