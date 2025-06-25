import type { IFooter } from '../../types/footer.types';

const baseFooterData = {
  form: {
    header: 'Get in Touch',
    subheader: 'Contact us for your bookkeeping needs',
  },
  info: {
    address: '123 Sample Street, Manila, Philippines',
    contact: '+63 912 345 6789',
    email: 'info@mncbookkeeping.ph',
  },
  copyright: '© 2025 MNC Bookkeeping Services PH',
};

const validFooterData: IFooter = {
  ...baseFooterData,
  socials: [
    { platform: 'facebook' as const, url: 'https://facebook.com/mnc' },
    { platform: 'instagram' as const, url: 'https://instagram.com/mnc' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/company/mnc' },
  ],
  links: [
    { label: 'Services', path: '/services' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'About', path: '/about' },
  ],
};

const { info, ...noInfoFooterData } = validFooterData;

const badSocialsFooterData = {
  ...baseFooterData,
  socials: 'Not an array!',
  links: validFooterData.links,
};

const emptyLinksFooterData: IFooter = {
  ...baseFooterData,
  socials: validFooterData.socials,
  links: [],
};

const invalidSocialPlatformFooterData = {
  ...baseFooterData,
  socials: [
    { platform: 'twitter', url: 'https://twitter.com/mnc' },
  ],
  links: validFooterData.links,
};

const missingFormFieldsFooterData = {
  ...baseFooterData,
  form: {
    header: 'Get in Touch',
  },
  socials: validFooterData.socials,
  links: validFooterData.links,
};

const invalidEmailFooterData: IFooter = {
  ...baseFooterData,
  info: {
    ...baseFooterData.info,
    email: 'not-an-email',
  },
  socials: validFooterData.socials,
  links: validFooterData.links,
};

export default {
  validFooterData,
  noInfoFooterData,
  badSocialsFooterData,
  emptyLinksFooterData,
  invalidSocialPlatformFooterData,
  missingFormFieldsFooterData,
  invalidEmailFooterData,
};
