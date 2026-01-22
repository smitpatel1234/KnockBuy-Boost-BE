import { transporter } from './mail-transporter'
import { ENV } from '../env/index'


export const sendNotificationEmail = async (
) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: ENV.COMPANY_NAME,
        address: ENV.USER_EMAIL,
      },
      to: '22IT113@charusat.edu.in',
      subject: 'New Notification',
      html: `
        <div style="max-width: 90%; margin: auto; padding-top: 20px; text-align: center;">
          <h2>main Notification</h2>
          <p style="font-size: 16px;">order details</p>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">This is an automated notification. Please do not reply.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
