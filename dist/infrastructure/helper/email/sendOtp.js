"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpOnEmail = void 0;
const index_1 = require("../env/index");
const mail_transporter_1 = require("./mail-transporter");
const sendOtpOnEmail = async () => {
    try {
        await mail_transporter_1.transporter.sendMail({
            from: {
                address: index_1.ENV.USER_EMAIL,
                name: index_1.ENV.COMPANY_NAME,
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
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};
exports.sendOtpOnEmail = sendOtpOnEmail;
