import type { IHome } from '../../types/home.types';

const baseHomeData = {
  cta: 'Sample CTA',
  heroTitle: 'Sample Hero Title',
  heroContent: 'Sample Hero Content',
};

const validHomeData = { ...baseHomeData,
  testimonials: [
    {
      testifier: 'Juan Dela Cruz',
      title: 'Amazing Service!',
      message: 'MNC Provided me with the best service ever!',
    },
    {
      testifier: 'Maria Clara',
      title: 'Excellent Service!',
      message: 'Services are complete and polished for my needs. <3',
    },
  ],
  services: [
    {
      title: 'Bookkeeping',
      items: [
        { description: 'Monthly bookkeeping and reconciliation' },
        { description: 'Financial statement preparation' },
      ],
    },
    {
      title: 'Tax Services',
      items: [
        { description: 'Tax filing and compliance' },
      ],
    },
  ],
};

// ACTUALLY SUPER BRILLIANT
const { heroTitle, ...noHeroTitleHomeData } = validHomeData;

const badTestimonialsHomeData = { ...baseHomeData,
  testimonials: 'Not an array!',
  services: validHomeData.services,
};

const emptyTestimonialsHomeData = { ...baseHomeData, testimonials: [], services: validHomeData.services };

const badServicesHomeData = { ...validHomeData, services: 'Not an array!' };

const missingServiceTitleHomeData = { ...validHomeData, services: [{ items: [{ description: 'No title here' }] }] };

const missingServiceItemDescriptionHomeData = { ...validHomeData, services: [{ title: 'Bookkeeping', items: [{ }] }] };

const homeTestHelper = {
  validHomeData: {
    hero: {
      title: 'Professional Bookkeeping Services',
      subtitle: 'Your trusted partner for financial success',
      cta: 'Get Started Today',
    },
    servicesHeader: 'Our Services',
    servicesDescription: 'Comprehensive bookkeeping solutions for your business',
    testimonialsHeader: 'What Our Clients Say',
    testimonialsDescription: 'Trusted by businesses across the Philippines',
    testimonials: [
      {
        testifier: 'John Doe',
        company: 'ABC Company',
        message: 'Excellent service and attention to detail.',
      },
      {
        testifier: 'Jane Smith',
        company: 'XYZ Corp',
        message: 'Professional and reliable bookkeeping services.',
      },
    ],
    services: [
      {
        title: 'Bookkeeping',
        items: [
          { description: 'General ledger maintenance' },
          { description: 'Financial statement preparation' },
        ],
      },
      {
        title: 'Tax Preparation',
        items: [
          { description: 'Income tax returns' },
          { description: 'VAT returns' },
        ],
      },
    ],
  } as IHome,

  invalidHomeData: {
    hero: {
      title: '',
      subtitle: '',
      cta: '',
    },
    servicesHeader: '',
    servicesDescription: '',
    testimonialsHeader: '',
    testimonialsDescription: '',
    testimonials: [],
    services: [],
  },

  partialUpdateData: {
    hero: {
      title: 'Updated Hero Title',
      subtitle: 'Updated Hero Subtitle',
      cta: 'Updated CTA',
    },
  },

  emptyTestimonialsData: {
    hero: {
      title: 'Professional Bookkeeping Services',
      subtitle: 'Your trusted partner for financial success',
      cta: 'Get Started Today',
    },
    servicesHeader: 'Our Services',
    servicesDescription: 'Comprehensive bookkeeping solutions for your business',
    testimonialsHeader: 'What Our Clients Say',
    testimonialsDescription: 'Trusted by businesses across the Philippines',
    testimonials: [],
    services: [
      {
        title: 'Bookkeeping',
        items: [
          { description: 'General ledger maintenance' },
          { description: 'Financial statement preparation' },
        ],
      },
    ],
  } as IHome,

  noHeroTitleHomeData,
  badTestimonialsHomeData,
  emptyTestimonialsHomeData,
  badServicesHomeData,
  missingServiceTitleHomeData,
  missingServiceItemDescriptionHomeData,
};

export default homeTestHelper;
