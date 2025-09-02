import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ZM QR App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You're invited to join ZM QR Code App 🎉",
      text: `Hi there 👋,

You’ve been invited to try out the ZM QR Code Generator!
With our tool, you can easily create, customize, and manage QR codes for your business or personal use.

Click the link below to get started:
https://www.zmqrcode.com

We’re excited to have you on board! 🚀

Best regards,
The ZM QR Team
`,
      html: `<p>Hi there 👋,</p>
             <p>You’ve been invited to try out the <b>ZM QR Code Generator</b> 🎉</p>
             <p>With our tool, you can easily create, customize, and manage QR codes for your business or personal use.</p>
             <p>
               👉 <a href="https://www.zmqrcode.com" style="background:#35aeae;color:#fff;padding:10px 15px;text-decoration:none;border-radius:6px;font-weight:bold;">
                 Join Now
               </a>
             </p>
             <p>We’re excited to have you on board! 🚀</p>
             <p>Best regards,<br/>The ZM QR Team</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
