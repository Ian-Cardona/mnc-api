


import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
}) as Transporter;

export const sendEmail = async (options: {
  emailer: string;
  contact: string;
  message: string;
}): Promise<SentMessageInfo> => {
  const text: string = `
  Emailer: ${options.emailer}
  Contact: ${options.contact}
  Message: ${options.message}
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_RECIPIENT,
    subject: 'New Inquiry for MNC Bookkeeping Services',
    text: text,
  };
  return (await transporter.sendMail(mailOptions)) as SentMessageInfo;
};

export default transporter;
