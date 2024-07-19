// emailService.js
import nodemailer from 'nodemailer'

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'onlinewizard763@gmail.com',
    pass: 'your-email-password'
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'onlinewizard763@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendEmail;
