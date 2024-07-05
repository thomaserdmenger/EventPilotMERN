import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const sentMessageInfo = await transporter.sendMail({
      // from: "Hello from TemplateMERN",
      from: '"Event Pilot" <noreply@event-pilot.org>',
      to,
      subject,
      text,
      html: text.replaceAll("\n", "<br/>"),
    });

    const success = sentMessageInfo.accepted.includes(to);
    return success;
  } catch (error) {
    console.log(error);
    return false;
  }
};
