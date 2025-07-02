import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HomeModel } from '../models/home.model';
import { FooterModel } from '../models/footer.model';
import { NavBarModel } from '../models/navbar.model';
import { AboutModel } from '../models/about.model';
import { ServicesModel } from '../models/services.model';
import { ContactModel } from '../models/contact.model';
import { GuidesModel } from '../models/guides.model';
import { platformEnum } from '../types/footer.type';

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
      { platform: platformEnum.enum.facebook, url: 'https://www.facebook.com/mncbsi' },
      { platform: platformEnum.enum.linkedin, url: 'https://www.linkedin.com/in/mnc-bookkeeping-services-50419b371/' },
    ],
    links: [
      { label: 'Services', path: '/services', external: false },
      { label: 'Guides', path: '/guides', external: false },
      { label: 'About', path: '/about', external: false },
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
        description: 'With almost ten years of experience and educational attainment, our founder decided to establish MNC Bookkeeping Services in August 2019.',
        icon: 'Target',
      },
    },
    values: [
      {
        id: '1',
        title: 'Confidentiality',
        description: 'Maintaining strict confidentiality of client information and business data.',
        icon: 'Lock',
      },
      {
        id: '2',
        title: 'Continual Improvement',
        description: 'Continuously enhancing our processes and services to deliver better results.',
        icon: 'TrendingUp',
      },
      {
        id: '3',
        title: 'Customer Focus',
        description: 'Putting our clients\' needs first and delivering personalized solutions.',
        icon: 'Heart',
      },
      {
        id: '4',
        title: 'Honesty and Integrity',
        description: 'Operating with transparency and ethical practices in all our dealings.',
        icon: 'Shield',
      },
      {
        id: '5',
        title: 'Timely Report',
        description: 'Delivering accurate and timely financial reports to support informed decisions.',
        icon: 'Clock',
      },
      {
        id: '6',
        title: 'Transparency',
        description: 'Maintaining open communication and clear reporting with our clients.',
        icon: 'Eye',
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
        },
        {
          id: '2',
          title: 'Professional Services',
          description: 'Comprehensive accounting and consulting services that protect our clients\' interests and optimize their financial operations.',
          icon: 'Award',
          tags: ['Bookkeeping', 'Tax', 'Consulting'],
        },
        {
          id: '3',
          title: 'Client Focus',
          description: 'We demonstrate flexibility and apply an individualized approach to each client, optimizing efficiency according to their business nature.',
          icon: 'Target',
          tags: ['Flexible', 'Tailored', 'Efficient'],
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
      },
      {
        id: '2',
        title: 'Accounting Professionals',
        description: 'Our team of certified accountants and auditors provides comprehensive financial services with attention to detail.',
        icon: 'Users',
        tags: ['Certified', 'Experienced', 'Professional'],
      },
      {
        id: '3',
        title: 'Support Staff',
        description: 'Dedicated support team ensuring smooth operations and excellent client service delivery.',
        icon: 'Support',
        tags: ['Dedicated', 'Efficient', 'Reliable'],
      },
    ],
    stats: [
      {
        id: '1',
        value: '10+',
        label: 'Years of Experience',
      },
      {
        id: '2',
        value: '2019',
        label: 'Company Founded',
      },
      {
        id: '3',
        value: '100%',
        label: 'Referral Based',
      },
      {
        id: '4',
        value: 'MBA',
        label: 'Educational Background',
      },
    ],
  });

  await about.save();
  console.log('About document seeded successfully.');
};

const seedServices = async () => {
  await ServicesModel.deleteMany({});
  console.log('Existing Services documents removed.');

  const services = new ServicesModel({
    hero: {
      title: 'Our Services',
      subtitle: 'MNC Bookkeeping Services offers a complete package of services for the accounting and tax advisory needs of any entity.',
      description: 'We implement a proactive approach by thoroughly reviewing, rather than just processing, all information we work with. Our experts are highly engaged in understanding the needs and requirements of our clients, ensuring efficient and straightforward communication regarding our services.',
      additionalInfo: 'Our excellence-focused team prioritizes maximum flexibility in meeting your requirements and expectations while saving your valuable time and effort.',
    },
    whyChooseUs: [
      {
        title: 'Complete Documentation Collection',
        description: 'We collect all monthly documentation from your company.',
        icon: 'FileText',
      },
      {
        title: 'Electronic BIR Filing',
        description: 'We file everything to the Bureau of Internal Revenue (BIR) electronically.',
        icon: 'Calculator',
      },
      {
        title: 'Accounts Tracking',
        description: 'We keep track of your accounts payable and receivable.',
        icon: 'TrendingUp',
      },
      {
        title: 'Legislative Updates',
        description: 'We keep you updated on important changes in legislation.',
        icon: 'Shield',
      },
      {
        title: 'Accurate & Prompt Reports',
        description: 'We ensure accounts and reports are accurate and delivered promptly.',
        icon: 'CheckCircle',
      },
      {
        title: 'Tax Optimization',
        description: 'We help reduce your taxes by advising you on maximizing your output and input tax.',
        icon: 'DollarSign',
      },
      {
        title: 'Business Success Focus',
        description: 'We are committed to your business success.',
        icon: 'Users',
      },
      {
        title: 'Prompt Communication',
        description: 'We respond promptly through email, text messages, or private messages.',
        icon: 'MessageCircle',
      },
    ],
    services: [
      {
        title: 'Accounting',
        description: 'We provide comprehensive bookkeeping services that comply with accounting procedures and regulations. Our team establishes appropriate accountability and awareness within your management team regarding accounting activities. The more information we gather, the better solutions we can offer for your business. Our accounting services follow national and international regulations, providing you with a complete service cycle for all your accounting operations.',
        icon: 'Calculator',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        color: 'from-blue-500 via-blue-600 to-blue-700',
      },
      {
        title: 'Payroll',
        description: 'In today\'s business world, successful and growing companies face the challenge of managing constantly increasing workforce needs. These needs bring more legislative regulations and higher demand for expert payroll professionals. As payroll is essential to every organization, we relieve you of the burden of navigating countless legislative documents while managing part-time or full-time employees\' payroll, benefits, employee taxation, and related issues. This allows you more time to expand your business and increase profitability.',
        icon: 'Users',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        color: 'from-emerald-500 via-emerald-600 to-emerald-700',
      },
      {
        title: 'Tax Return',
        description: 'Every local organization and individual is required to declare their revenue (income) by submitting an annual tax return along with the respective applications and attachments. MNC Bookkeeping Services provides comprehensive services for the preparation and submission of tax returns for companies and individuals. We handle the entire process from collecting required documentation to computing your quarterly and annual returns and submitting them electronically on or before the due date.',
        icon: 'FileText',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        color: 'from-purple-500 via-purple-600 to-purple-700',
      },
    ],
    cta: {
      title: 'Ready to Get Started?',
      description: 'Let us handle your accounting, payroll, and tax needs so you can focus on growing your business.',
      buttonText: 'Get Started',
    },
  });

  await services.save();
  console.log('Services document seeded successfully.');
};

const seedContact = async () => {
  await ContactModel.deleteMany({});
  console.log('Existing Contact documents removed.');

  const contact = new ContactModel({
    hero: {
      title: 'Get In Touch',
      subtitle: 'Ready to start your journey with us? We\'re here to help you with all your bookkeeping and accounting needs.',
    },
    contactInfo: {
      phone: '(02) 869-36325',
      email: 'mnc.bookkeeping.servicesph@gmail.com',
      address: 'No. 56 JB Santos Street, Wawa Tangos, South Navotas City, Philippines 1489',
    },
    socials: {
      facebook: 'https://www.facebook.com/mncbsi',
      linkedin: 'https://www.linkedin.com/in/mnc-bookkeeping-services-50419b371/',
    },
    businessHours: [
      { day: 'Monday to Friday', hours: '8:00 AM - 5:00 PM' },
      { day: 'Saturday and Sunday', hours: 'Closed' },
    ],
  });

  await contact.save();
  console.log('Contact document seeded successfully.');
};

const seedGuides = async () => {
  await GuidesModel.deleteMany({});
  console.log('Existing Guides documents removed.');

  const guides = new GuidesModel({
    hero: {
      title: 'Philippine BIR Forms Guide',
      subtitle: 'Essential BIR forms for businesses and individuals in the Philippines. Download and learn about each form below.',
    },
    forms: [
      { name: 'BIR Form 1604-C', url: 'https://bir-cdn.bir.gov.ph/local/pdf/1604-C%20Jan%202018%20Final.pdf', description: 'Annual Information Return of Income Taxes Withheld on Compensation' },
      //{ name: 'BIR Form 1619-F', url: '', description: 'Monthly Remittance Return of Final Income Taxes Withheld' },
      //{ name: 'BIR Form 1619-E', url: '', description: 'Monthly Remittance Return of Creditable Income Taxes Withheld (Expanded)' },
      { name: 'BIR Form 1601C', url: 'https://bir-cdn.bir.gov.ph/local/pdf/1601C%20final%20Jan%202018%20with%20DPA.pdf', description: 'Monthly Remittance Return of Income Taxes Withheld on Compensation' },
      //{ name: 'BIR Form 1701A', url: '', description: 'Annual Income Tax Return for Individuals Earning Income PURELY from Business/Profession (those under the graduated income tax rates with OSD as mode of deduction or those who opted to avail of the 8% flat income tax rate)' },
      //{ name: 'BIR Form 1701Q', url: '', description: 'Quarterly Income Tax Return for Individuals, Estates and Trusts' },
      //{ name: 'BIR Form 1702-MX', url: '', description: 'Annual Income Tax Return for Corporation, Partnership and Other Non-Individual with MIXED Income Subject to Multiple Income Tax Rates or with Income Subject to SPECIAL/PREFERENTIAL RATE' },
      //{ name: 'BIR Form 1702-EX', url: '', description: 'Annual Income Tax Return for Use ONLY by Corporation, Partnership and Other Non-Individual Taxpayer EXEMPT under the Tax Code, as amended, (Sec. 30 and those exempted in Sec. 27(C) and other special laws, with NO other taxable income)' },
      //{ name: 'BIR Form 1700', url: '', description: 'Annual Income Tax Return for Individuals Earning Purely Compensation Income (including Non-Business/Non-Profession Income)' },
      //{ name: 'BIR Form 1701-MS', url: '', description: 'Annual Income Tax Return for Individuals Earning Mixed Income/Multiple Sources' },
      //{ name: 'BIR Form 1702-RT', url: '', description: 'Annual Income Tax Return for Corporation, Partnership and Other Non-Individual Taxpayer Subject Only to REGULAR Income Tax Rate' },
      //{ name: 'BIR Form 1702Q', url: '', description: 'Quarterly Income Tax Return for Corporations, Partnerships and Other Non-Individual Taxpayers' },
      //{ name: 'BIR Form 1601-EQ', url: '', description: 'Quarterly Remittance Return of Creditable Income Taxes Withheld (Expanded)' },
      { name: 'BIR Form 1601-FQ', url: 'https://bir-cdn.bir.gov.ph/local/pdf/1601-FQ%202020%20final.pdf', description: 'Quarterly Remittance Return of Final Income Taxes Withheld' },
      //{ name: 'BIR Form 2550Q', url: '', description: 'Quarterly Value-Added Tax Return' },
      //{ name: 'BIR Form 2551M', url: '', description: 'Monthly Percentage Tax Return' },
    ],
    cta: 'Contact us if you need assistance with any BIR forms or have questions about tax requirements.',
  });

  await guides.save();
  console.log('Guides document seeded successfully.');
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
    await seedServices();
    await seedContact();
    await seedGuides();

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
