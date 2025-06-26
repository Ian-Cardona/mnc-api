/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  to: string;
  subject: string;
  text: string;
}): Promise<SentMessageInfo> => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  return (await transporter.sendMail(mailOptions)) as SentMessageInfo;
};

export default transporter;
