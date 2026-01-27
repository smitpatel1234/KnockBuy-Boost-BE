import nodemailer from 'nodemailer'

import { ENV } from '../env/index'

export const transporter = nodemailer.createTransport({
  auth: {
    pass: ENV.EMAIL_PASSWORD,
    user: ENV.USER_EMAIL,
  },
  host: ENV.SMTP_HOST,
  port: 465,
  secure: true,
  service: ENV.MAIL_SERVICE,
})
