import nodemailer from "nodemailer";

// ✅ All messages in one place
const emailTemplates = {
  welcome: (user) => ({
    subject: "Welcome to ZM QR!",
    html: `
      <p>Hi ${user.name},</p>
      <p>You’ve successfully joined our platform. Enjoy 5 free QR codes, valid for 90 days. Start creating now!</p>
    `,
  }),

  signup: (user) => ({
    subject: "Welcome to ZM QR Code Services!",
    html: `
      <p>Hi ${user.name},</p>
      <p>You’ve successfully signed up to ZM QR Code Services.</p>
    `,
  }),

  login: (user) => ({
    subject: "Login Successful",
    html: `
      <p>Hi ${user.name},</p>
      <p>Welcome back to ZM QR Code Services! You’ve logged in successfully.</p>
    `,
  }),

  paymentSuccess: (user, planInfo) => ({
    subject: "Payment Successful",
    html: `
      <p>Hi ${user.name},</p>
      <p>Payment received successfully. Thank you for your purchase in ZM QR Code Services.</p>
      <p>Plan Details: ${planInfo}</p>
    `,
  }),

  paymentFailed: (user) => ({
    subject: "Payment Failed",
    html: `
      <p>Hi ${user.name},</p>
      <p>Your transaction couldn’t be completed. Retry now to activate your QR code plan without delay.</p>
    `,
  }),

  freeQR: (user, usedCount = 0) => {
    const remaining = 5 - usedCount;
    return {
      subject: "Your Free QR Codes",
      html: `
        <p>Hi ${user.name},</p>
        <p>As a new user, you get 5 QR codes FREE.</p>
        <p>You’ve used ${usedCount} out of 5 — you still have ${remaining} free QR codes remaining.</p>
        <p>Use them within 30 days, each valid for 90 days from creation.</p>
      `,
    };
  },

  reset: (user, success = true) => ({
    subject: success
      ? "Password Reset Successful"
      : "Password Reset Failed",
    html: success
      ? <p>Hi ${user.name}, your password has been successfully reset on ZM QR Code.</p>
      : <p>Hi ${user.name}, password reset failed on ZM QR Code. Please try again.</p>,
  }),

  download: (user) => ({
    subject: "Your QR Code is Ready!",
    html: `
      <p>Hi ${user.name},</p>
      <p>Your QR Code is ready! Click below to download it now.</p>
      <p>Thank you for using ZM QR Code Services!</p>
    `,
  }),

  upgrade: (user, planInfo) => ({
    subject: "Upgrade to Secure QR Codes",
    html: `
      <p>Hi ${user.name},</p>
      <p>${planInfo}</p>
    `,
  }),

  purchase: (user, purchaseMessage) => ({
    subject: "QR Code Purchase Successful",
    html: `
      <p>Hi ${user.name},</p>
      <p>${purchaseMessage}</p>
    `,
  }),

  encryptedService: (user, message) => ({
    subject: "Encrypted QR Code Activated",
    html: `
      <p>Hi ${user.name},</p>
      <p>${message}</p>
    `,
  }),

  validityReminder: (user, message) => ({
    subject: "QR Code Expiry Reminder",
    html: `
      <p>Hi ${user.name},</p>
      <p>${message}</p>
    `,
  }),

  serviceDeleted: (user, serviceName) => ({
    subject: "Service Deleted Successfully",
    html: `
      <p>Hi ${user.name},</p>
      <p>Your <b>${serviceName}</b> service has been deleted successfully from ZM QR Code Services.</p>
      <p>If this wasn’t you, please contact our support team immediately.</p>
    `,
  }),
};

// ✅ Common function to send emails
export async function triggerMessage(user, type, extra = null) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password if 2FA enabled
      },
    });

    if (!emailTemplates[type]) {
      throw new Error(`No email template found for type: ${type}`);
    }

    const { subject, html } = emailTemplates[type](user, extra);

    const info = await transporter.sendMail({
      from: `"ZM QR Services" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject,
      html,
    });

    console.log(`[Email] "${type}" sent to ${user.email}: ${info.response}`);
  } catch (err) {
    console.error(`[Email Error] ${type}:`, err.message);
    throw err;
  }
}