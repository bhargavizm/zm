import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // Gmail app password
  },
});

export const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = { from: process.env.EMAIL_USER, to, subject, text: message };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
