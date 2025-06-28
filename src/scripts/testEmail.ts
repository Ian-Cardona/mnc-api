import 'dotenv/config';
import { sendEmail } from '../services/email.service';

async function main() {
  try {
    const info = await sendEmail({
      emailer: 'iancardona.dev@gmail.com',
      contact: '09451159717',
      message: 'Hello, this is a test message for customers. If this sends, it means it works. Thank you',
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main().catch(console.error);
