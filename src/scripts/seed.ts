import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HomeModel } from '../models/home.model';

dotenv.config();

const seedHome = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await HomeModel.deleteMany({});
    console.log('Existing Home documents removed.');

    const home = new HomeModel({
      cta: 'Send us a message!',
      heroTitle: 'Your Numbers. Our Focus.',
      heroContent: 'We help achieve your financial objectives through professional, polite, and timely bookkeeping, tax services, and financial audits.',
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
          title: 'Business Processing',
          items: [
            { description: 'Monthly bookkeeping and reconciliation' },
            { description: 'Financial statement preparation' },
            { description: 'Payroll processing and management' },
            { description: 'Accounts receivable and payable tracking' },
            { description: 'Bank reconciliation' },
          ],
        },
        {
          title: 'Business Registration',
          items: [
            { description: 'DTI/SEC registration assistance' },
            { description: 'BIR registration and compliance' },
            { description: 'Business permit processing' },
            { description: 'SSS, PhilHealth, and Pag-IBIG registration' },
          ],
        },
        {
          title: 'HR & Accounting Services',
          items: [
            { description: 'Payroll computation and remittance' },
            { description: 'Preparation of financial reports' },
            { description: 'Employee benefits administration' },
            { description: 'HR compliance and documentation' },
          ],
        },
      ],
    });

    await home.save();
    console.log('Home document seeded successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedHome();
