const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transport = {
    host: process.env.SMPT_HOST,
    port: Number(process.env.SMPT_PORT || 25),
    secure: process.env.SMPT_SECURE === "true",
  };

  if (process.env.SMPT_SERVICE) {
    transport.service = process.env.SMPT_SERVICE;
  }

  if (process.env.SMPT_MAIL && process.env.SMPT_PASSWORD) {
    transport.auth = {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    };
  }

  const transporter = nodemailer.createTransport(transport);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
