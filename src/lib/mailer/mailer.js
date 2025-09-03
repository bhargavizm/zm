import nodemailer from "nodemailer";
console.log("Mailer module loaded");
console.log("EMAIL_USER:", process.env.EMAIL_USER, process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // Gmail app password
  },
});

export const sendEmail = async (to, subject, message) => {
  console.log("Sending OTP to:", to, subject, message);
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export const sendOtpEmail = async (to, name, otp) => {
  const subject = "Welcome to ZM QR Code Services – Verify Your Email";
  const message = `Hello ${name},

🎉 Thank you for registering with us.  

To complete your signup, please verify your email using the code below:

👉 OTP: ${otp}

This code will expire in 10 minutes for security reasons.  
If you didn’t request this, you can safely ignore this email.

We’re excited to have you on board! 🚀  

Best regards,  
The ZM QR Code Services Team`;

  return await sendEmail(to, subject, message);
};



export const sendResendOtpEmail = async (to, name, otp) => {
  const subject = "ZM QR Code Services – Your New Verification Code";
  const message = `Hello ${name},

You requested a new verification code.  

👉 Your new OTP: ${otp}

This code will expire in 10 minutes.  
If you didn’t request this, you can safely ignore this email.

Best regards,  
The ZM QR Code Services Team`;

  return await sendEmail(to, subject, message);
};