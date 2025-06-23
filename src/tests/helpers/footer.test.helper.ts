const baseFooterData = {
  copyright: '© 2025 MNC Bookkeeping Services PH',
  address: '123 Sample Street, Manila, Philippines',
};

const validFooterData = {
  ...baseFooterData,
  socials: [
    { platform: 'facebook', url: 'https://facebook.com/mnc' },
    { platform: 'instagram', url: 'https://instagram.com/mnc' },
  ],
  links: [
    { label: 'Services', path: '/services' },
    { label: 'FAQs', path: '/faqs' },
  ],
};

const { address, ...noAddressFooterData } = validFooterData;

const badSocialsFooterData = {
  ...baseFooterData,
  socials: 'Not an array!',
  links: validFooterData.links,
};

const emptyLinksFooterData = {
  ...baseFooterData,
  socials: validFooterData.socials,
  links: [],
};

export default {
  validFooterData,
  noAddressFooterData,
  badSocialsFooterData,
  emptyLinksFooterData,
};
