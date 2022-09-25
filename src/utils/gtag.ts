export const pageview = (url: URL): void => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID as string, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
