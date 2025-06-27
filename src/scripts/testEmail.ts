import 'dotenv/config';
import { sendEmail } from '../services/email.service';

async function main() {
  try {
    const info = await sendEmail({
      emailer: 'iancardona.dev@gmail.com',
      contact: '1234567890',
      message: 'This is a test email sent using nodemailer and Gmail app password.',
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main().catch(console.error);
