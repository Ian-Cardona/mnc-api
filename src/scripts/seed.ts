import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HomeModel } from '../models/home.model';
import { FooterModel } from '../models/footer.model';
import { NavBarModel } from '../models/navbar.model';
import { AboutModel } from '../models/about.model';

dotenv.config();

const seedHome = async () => {
  await HomeModel.deleteMany({});
  console.log('Existing Home documents removed.');

  const home = new HomeModel({
    hero: {
      title: 'Your Numbers. Our Focus.',
      subtitle: 'We help you achieve your financial objectives through professional, polite, and timely bookkeeping, tax services, and financial audits.',
      cta: 'Send us a message!',
    },
    servicesHeader: 'Our Services',
    servicesDescription: 'Comprehensive business solutions tailored to your needs',
    testimonialsHeader: 'What Our Clients Say',
    testimonialsDescription: 'Trusted by businesses across the Philippines',
    testimonials: [
      {
        testifier: 'Ms. Leonora Lagasa',
        company: 'GINSUI KANSHA INC - Operations Manager',
        message: 'We acquired the services of MNCBS since September 2019. They have been with us since we restarted our business, and since then, we have established not only a good working relationship but also a good friendship between the owner and the staff. MNCBS is the one who guided us and helped us progress our business. They extend their services beyond their working scope. We highly recommend MNCBS to be part of your start-up company!',
      },
      {
        testifier: 'Ms. Ma Katrina Malvar',
        company: 'EKITE ELECTRONIC BICYCLE TRADING - Operations Manager',
        message: 'We found MNCBS through referrals from one of our staff members. They have been with us since 2024, and we have never encountered any problems transacting with them. They always extend their help beyond the working agreement with our organization. They treat us as one of their valued clients. MNCBS is very recommendable because they are very professional.',
      },
      {
        testifier: 'Ms. Angela de Guzman',
        company: 'Business Owner',
        message: 'I recommend this organization because the staff are very approachable, even when your inquiry is beyond their scope. They are accommodating and give their best to answer questions. They are very professional in handling their clients and they meet beyond your expectations. Thank you, MNCBS, for assisting me.',
      },
      {
        testifier: 'Ms. Pamela Santos',
        company: 'Business Owner',
        message: 'MNCBS offers minimal fees but great results. They consider the business status when preparing quotations. I have been with MNCBS since 2020 during the pandemic, and they really gave us very affordable rates. Thank you, MNCBS!',
      },
      {
        testifier: 'Ms. Jovie Leonud',
        company: 'Business Owner',
        message: 'This organization helped me in filing my taxes with the BIR. They charged me minimal fees because I am a small business owner only. What I like about them is they are not greedy when it comes to sharing their knowledge; they are willing to explain every detail to their clients.',
      },
    ],
    services: [
      {
        title: 'Business Processing',
        items: [
          { description: 'Closure' },
          { description: 'Amendment' },
          { description: 'Renewal' },
          { description: 'BIR Open Cases' },
        ],
      },
      {
        title: 'Business Registration',
        items: [
          { description: 'DTI Registration' },
          { description: 'SEC Registration' },
          { description: 'BIR Registration' },
          { description: 'Social Charges Registration (Philhealth/SSS/Pag-IBIG)' },
          { description: 'Mayor\'s Permit' },
        ],
      },
      {
        title: 'HR & Accounting Services',
        items: [
          { description: 'Bookkeeping' },
          { description: 'Retainer Services' },
          { description: 'BIR Tax Filing & Compliance' },
          { description: 'Annual Income Tax' },
          { description: 'Payroll & Employee Benefits' },
          { description: 'Legal Services' },
          { description: 'Liaison Services' },
        ],
      },
    ],
  });

  await home.save();
  console.log('Home document seeded successfully.');
};

const seedNavBar = async () => {
  await NavBarModel.deleteMany({});
  console.log('Existing NavBar documents removed.');

  const navBar = new NavBarModel({
    links: [
      { label: 'Services', path: '/services' },
      { label: 'Guides', path: '/guides' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    cta: {
      label: 'Check Us Out',
      url: 'https://www.facebook.com/mncbsi',
      external: true,
    },
  });

  await navBar.save();
  console.log('NavBar document seeded successfully.');
};

const seedFooter = async () => {
  await FooterModel.deleteMany({});
  console.log('Existing Footer documents removed.');

  const footer = new FooterModel({
    form: {
      header: 'Get In Touch',
      subheader: 'Ready to start your journey with us?',
    },
    info: {
      address: 'No. 56 JB Santos Street, Wawa Tangos, South Navotas City, Philippines 1489',
      contact: '(02) 869-36325',
      email: 'mnc.bookkeeping.servicesph@gmail.com',
    },
    socials: [
      { platform: 'facebook', url: 'https://www.facebook.com/mncbsi' },
      { platform: 'instagram', url: 'https://instagram.com/mnc' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/mnc-bookkeeping-services-50419b371/' },
    ],
    links: [
      { label: 'Services', path: '/services' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Contact', path: '/contact', external: false },
    ],
    copyright: '© 2025 MNC Bookkeeping Services',
  });

  await footer.save();
  console.log('Footer document seeded successfully.');
};

const seedAbout = async () => {
  await AboutModel.deleteMany({});
  console.log('Existing About documents removed.');

  const about = new AboutModel({
    hero: {
      title: 'About Us',
      subtitle: 'Professional bookkeeping services with over a decade of experience in financial management and accounting excellence.',
    },
    story: {
      title: 'Our Story',
      paragraphs: [
        'Our founder started her bookkeeping work in 2011 at a multinational private company. She worked at the company for almost ten (10) years as an Accountant for a specific business unit and was later promoted to Finance Manager for two (2) years.',
        'During this time, she enhanced her knowledge and skills in financial and accounting aspects. She also took accounting courses and completed her Master\'s Degree in Business Administration.',
      ],
      highlight: {
        title: 'Established in 2019',
        description: 'With almost ten years of experience and educational attainment, our founder decided to establish MNC Bookkeeping Services PH in August 2019.',
        icon: 'Target',
      },
    },
    location: {
      title: 'Our Office',
      address: 'No. 56 JB Santos Street, Wawa Tangos, Navotas City, Philippines 1485',
    },
    values: [
      {
        id: '1',
        title: 'Confidentiality',
        description: 'Maintaining strict confidentiality of client information and business data.',
        icon: 'Lock',
        order: 1,
      },
      {
        id: '2',
        title: 'Continual Improvement',
        description: 'Continuously enhancing our processes and services to deliver better results.',
        icon: 'TrendingUp',
        order: 2,
      },
      {
        id: '3',
        title: 'Customer Focus',
        description: 'Putting our clients\' needs first and delivering personalized solutions.',
        icon: 'Heart',
        order: 3,
      },
      {
        id: '4',
        title: 'Honesty and Integrity',
        description: 'Operating with transparency and ethical practices in all our dealings.',
        icon: 'Shield',
        order: 4,
      },
      {
        id: '5',
        title: 'Timely Report',
        description: 'Delivering accurate and timely financial reports to support informed decisions.',
        icon: 'Clock',
        order: 5,
      },
      {
        id: '6',
        title: 'Transparency',
        description: 'Maintaining open communication and clear reporting with our clients.',
        icon: 'Eye',
        order: 6,
      },
    ],
    approach: {
      title: 'Our Approach',
      description: 'With the technological expertise of the younger generation, combined with the knowledge of our professionally educated and experienced accountants and auditors, we have developed and improved our working methods and internal procedures.',
      members: [
        {
          id: '1',
          title: 'Experienced Team',
          description: 'Our founder brings over 10 years of experience in multinational companies, including roles as Accountant and Finance Manager.',
          icon: 'Users',
          tags: ['10+ Years', 'MBA', 'CPA'],
          order: 1,
        },
        {
          id: '2',
          title: 'Professional Services',
          description: 'Comprehensive accounting and consulting services that protect our clients\' interests and optimize their financial operations.',
          icon: 'Award',
          tags: ['Bookkeeping', 'Tax', 'Consulting'],
          order: 2,
        },
        {
          id: '3',
          title: 'Client Focus',
          description: 'We demonstrate flexibility and apply an individualized approach to each client, optimizing efficiency according to their business nature.',
          icon: 'Target',
          tags: ['Flexible', 'Tailored', 'Efficient'],
          order: 3,
        },
      ],
    },
    team: [
      {
        id: '1',
        title: 'Our Founder',
        description: 'Leading our team with over 10 years of experience in multinational companies, including roles as Accountant and Finance Manager.',
        icon: 'User',
        tags: ['10+ Years', 'MBA', 'Leadership'],
        order: 1,
      },
      {
        id: '2',
        title: 'Accounting Professionals',
        description: 'Our team of certified accountants and auditors provides comprehensive financial services with attention to detail.',
        icon: 'Users',
        tags: ['Certified', 'Experienced', 'Professional'],
        order: 2,
      },
      {
        id: '3',
        title: 'Support Staff',
        description: 'Dedicated support team ensuring smooth operations and excellent client service delivery.',
        icon: 'Support',
        tags: ['Dedicated', 'Efficient', 'Reliable'],
        order: 3,
      },
    ],
    stats: [
      {
        id: '1',
        value: '10+',
        label: 'Years of Experience',
        order: 1,
      },
      {
        id: '2',
        value: '2019',
        label: 'Company Founded',
        order: 2,
      },
      {
        id: '3',
        value: '100%',
        label: 'Referral Based',
        order: 3,
      },
      {
        id: '4',
        value: 'MBA',
        label: 'Educational Background',
        order: 4,
      },
    ],
    contact: {
      title: 'Ready to Work Together?',
      description: 'Let\'s discuss how we can help optimize your accounting, finances, and tax obligations according to the nature of your business.',
      ctaText: 'Get In Touch',
      ctaIcon: 'Mail',
    },
  });

  await about.save();
  console.log('About document seeded successfully.');
};

const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await seedHome();
    await seedNavBar();
    await seedFooter();
    await seedAbout();

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seed().catch((err) => {
  console.error('Unhandled error in seed script:', err);
  process.exit(1);
});
