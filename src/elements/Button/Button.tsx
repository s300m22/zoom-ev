/* eslint-disable @next/next/link-passhref */
import React, { ButtonHTMLAttributes } from 'react';
import NextLink from 'next/link';
import { CSSProperties } from 'styled-components';
import { Arrow, ButtonVariant, StyledButton, Loader } from './Button.styled';
import {
  IFaqPage,
  IFaq,
  IPage,
  INavigationLink,
  IBlogPost,
} from '../../interfaces/contentful.types.generated';
import { getUrlPrefix } from '../../utils';
import mixpanel from 'mixpanel-browser';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: INavigationLink;
  variant?: ButtonVariant;
  href?: string;
  withArrow?: boolean;
  customStyles?: CSSProperties;
  isLoading?: boolean;
  analyticsData?: {
    [v: string]: any;
  };
}

const Button = (
  {
    children,
    variant = 'contained',
    link,
    withArrow = false,
    href,
    customStyles,
    isLoading = false,
    analyticsData = {},
    ...rest
  }: ButtonProps,
  ref: any,
) => {
  const handleLinkClick = (e: any) => {
    mixpanel.track('button_click', {
      title: typeof children === 'string' || children instanceof String ? children : 'non text',
      ...analyticsData,
      ...(link?.fields?.analyticsData ?? {}),
    });
    if (link?.fields.customUrl && link?.fields.customUrl.startsWith('http')) {
      e.preventDefault();
      window.open(link?.fields.customUrl);
    }
    if (rest.onClick) rest.onClick(e);
  };

  if (link?.fields) {
    const { buttonVariant, linkedEntry, customUrl, label, showArrow } = link.fields;
    const urlPrefix = getUrlPrefix(linkedEntry);
    const navigateTo =
      (linkedEntry as unknown as IFaqPage | IFaq | IPage)?.fields?.urlSlug ||
      (linkedEntry as unknown as IBlogPost)?.fields?.slug ||
      customUrl ||
      '';

    return (
      <NextLink href={`${urlPrefix}${navigateTo}`}>
        <StyledButton
          disabled={rest.disabled || isLoading}
          ref={ref}
          variant={buttonVariant || variant}
          {...rest}
          onClick={handleLinkClick}
        >
          {children || label}
          {showArrow && !isLoading && <Arrow />}
          {isLoading && <Loader />}
        </StyledButton>
      </NextLink>
    );
  }

  if (href) {
    return (
      <NextLink href={href}>
        <StyledButton
          disabled={rest.disabled || isLoading}
          ref={ref}
          variant={variant}
          {...rest}
          onClick={handleLinkClick}
        >
          {children}
          {withArrow && !isLoading && <Arrow />}
          {isLoading && <Loader />}
        </StyledButton>
      </NextLink>
    );
  }

  return (
    <StyledButton
      ref={ref}
      variant={variant}
      {...rest}
      disabled={rest.disabled || isLoading}
      onClick={handleLinkClick}
      style={customStyles}
    >
      {children}
      {withArrow && !isLoading && <Arrow />}
      {isLoading && <Loader />}
    </StyledButton>
  );
};

export default React.forwardRef(Button);
