import { ENV } from '../env/index'
import { transporter } from './mail-transporter'


export const sendOtpOnEmail = async () => {
  try {
    await transporter.sendMail({
      from: {
        address: ENV.USER_EMAIL,
        name: ENV.COMPANY_NAME,
      },
      html: `
        <div style="max-width: 90%; margin: auto; padding-top: 20px; text-align: center;">
          <h2>main Notification</h2>
          <p style="font-size: 16px;">order details</p>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">This is an automated notification. Please do not reply.</p>
        </div>
      `,
      subject: 'New Notification',
      to: '22IT113@charusat.edu.in',
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
