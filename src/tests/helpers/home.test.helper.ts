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

export default {
  validHomeData,
  noHeroTitleHomeData,
  badTestimonialsHomeData,
  emptyTestimonialsHomeData,
  badServicesHomeData,
  missingServiceTitleHomeData,
  missingServiceItemDescriptionHomeData,
};
