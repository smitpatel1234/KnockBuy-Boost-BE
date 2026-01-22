"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationEmail = void 0;
const mail_transporter_1 = require("./mail-transporter");
const index_1 = require("../env/index");
const sendNotificationEmail = async () => {
    try {
        const info = await mail_transporter_1.transporter.sendMail({
            from: {
                name: index_1.ENV.COMPANY_NAME,
                address: index_1.ENV.USER_EMAIL,
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
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};
exports.sendNotificationEmail = sendNotificationEmail;
