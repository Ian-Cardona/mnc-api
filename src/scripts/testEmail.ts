import 'dotenv/config';
import { sendEmail } from '../services/email.service';

async function main() {
  try {
    const info = await sendEmail({
      to: 'iancardona.dev@gmail.com',
      subject: 'Test Email from MNC API',
      text: 'This is a test email sent using nodemailer and Gmail app password.',
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main().catch(console.error);
