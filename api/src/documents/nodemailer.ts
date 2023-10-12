import { getEnv } from '../utils/helpers';

const nodemailer = require('nodemailer');

export const sendEmail = (options: any) => {
  const smtpTransparent = nodemailer.createTransport({
    host: getEnv('SMTP_SERVER'),
    service: 'gmail',
    port: getEnv('SMTP_PORT'),
    secure: true,
    auth: {
      user: getEnv('SMTP_USER'),
      pass: getEnv('SMTP_PASS'),
    },
  } as any);

  const mailOptions = {
    from: options.from || `"From " <${getEnv('SMTP_USER')}>`,
    to: options.to || `"To " <${getEnv('SMTP_USER')}>`,
    subject: options.subject,
    html: options.text,
  };

  return smtpTransparent.sendMail(mailOptions);
};
