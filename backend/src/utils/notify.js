
import nodemailer from 'nodemailer';
import twilio from 'twilio';

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};

export const sendSMS = async ({ to, body }) => {
  if (!process.env.TWILIO_SID) return;
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  await client.messages.create({ to, from: process.env.TWILIO_FROM, body });
};

export const sendPush = async ({ to, title, body }) => {
  console.log('Push to', to, title, body);
};
