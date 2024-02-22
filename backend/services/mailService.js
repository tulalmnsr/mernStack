// mailService.js
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'servicescleaningzbmz@gmail.com',
    pass: '12345678ZBMZ',
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'servicescleaningzbmz@gmail.com',
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
