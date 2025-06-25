import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HomeModel } from '../models/home.model';
import { FooterModel } from '../models/footer.model';
import { NavBarModel } from '../models/navbar.model';

dotenv.config();

const seedHome = async () => {
  await HomeModel.deleteMany({});
  console.log('Existing Home documents removed.');

  const home = new HomeModel({
    hero: {
      title: 'Your Numbers. Our Focus.',
      subtitle: 'We help achieve your financial objectives through professional, polite, and timely bookkeeping, tax services, and financial audits.',
      cta: 'Send us a message!',
    },
    servicesHeader: 'Our Services',
    servicesDescription: 'Comprehensive business solutions tailored to your needs',
    testimonialsHeader: 'What Our Clients Say',
    testimonialsDescription: 'Trusted by businesses across the Philippines',
    testimonials: [
      {
        testifier: 'Ms. Leonora Lagasa',
        company: 'GINSUI KANSHA INC - Operation Manager',
        message: 'We acquired the services of MNCBS since September 2019. They have been with us since we restarted our business, and since then, we have established not only a good working relationship but also a good friendship between the owner and the staff. MNCBS is the one who guided us and helped us progress our business. They extend their services beyond their working scope. We highly recommend MNCBS to be part of your start-up company!',
      },
      {
        testifier: 'Ms. Ma Katrina Malvar',
        company: 'EKITE ELECTRONIC BICYCLE TRADING - Operation Manager',
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
          { description: 'Payroll Employees Benefits' },
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
      address: 'No. 56 JB Santos Street Wawa Tangos South Navotas City, Philippines 1489',
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
