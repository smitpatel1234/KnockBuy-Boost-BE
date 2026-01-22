import nodemailer from 'nodemailer'
import { ENV } from '../env/index'

export const transporter = nodemailer.createTransport({
  service: ENV.MAIL_SERVICE,
  host: ENV.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: ENV.USER_EMAIL,
    pass: ENV.EMAIL_PASSWORD,
  },
})
