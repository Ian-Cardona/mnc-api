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
  ] };

// ACTUALLY SUPER BRILLIANT
const { heroTitle, ...noHeroTitleHomeData } = validHomeData;

const badTestimonialsHomeData = { ...baseHomeData,
  testimonials: 'Not an array!' };

const emptyTestimonialsHomeData = { ...baseHomeData, testimonials: [] };

export default {
  validHomeData,
  noHeroTitleHomeData,
  badTestimonialsHomeData,
  emptyTestimonialsHomeData,
};
