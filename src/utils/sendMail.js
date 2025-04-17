import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const mailOptions = (to, code) => {
  return {
    from: process.env.GMAIL_USER,
    to,
    subject: "Welcome to Our Website!",
    text: "Please activate account",
    html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .email-header h1 {
              margin: 0;
              font-size: 24px;
            }
            .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
            }
            .verification-code {
              font-size: 20px;
              font-weight: bold;
              color: #667eea;
              text-align: center;
              margin: 20px 0;
            }
            .verification-link {
              display: block;
              text-align: center;
              margin: 20px 0;
            }
            .verification-link a {
              color: #ffffff;
              background: #667eea;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
            }
            .email-footer {
              background: #f4f4f4;
              color: #666666;
              text-align: center;
              padding: 10px;
              font-size: 14px;
            }
            .email-footer a {
              color: #667eea;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Welcome to Our Service!</h1>
            </div>
            <div class="email-body">
              <p>Hi there,</p>
              <p>Thank you for signing up for our service. We're excited to have you on board!</p>
              <p>To complete your registration, please use the verification code below:</p>
              <div class="verification-code">${code}</div>
              <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
              <p>Best regards,</p>
              <p>The Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2025 Our Service. All rights reserved.</p>
              <p>
                <a href="https://example.com/privacy-policy">Privacy Policy</a> | 
                <a href="https://example.com/terms">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};
