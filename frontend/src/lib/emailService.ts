import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

export async function sendLeadNotificationEmail(enquiry: {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  channels?: string[];
  budget?: string;
  message?: string;
  createdAt?: string | Date;
}) {
  const recipient = process.env.NOTIFICATION_EMAIL || "priyanshgupta2307@gmail.com";
  const authEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "sales@brandqubeindia.com";

  const userFormattedSender = enquiry.name
    ? `${enquiry.name} <${enquiry.email || "No email provided"}>`
    : (enquiry.email || "BrandQube Website Lead");

  const transporter = getTransporter();
  if (!transporter) {
    console.log("[enquiries] SMTP credentials not configured. Skipping email dispatch.");
    return { ok: false, error: "SMTP credentials missing in env" };
  }

  const channelsList = enquiry.channels && enquiry.channels.length > 0
    ? enquiry.channels.join(", ")
    : "Not specified";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #ff4d00; border-bottom: 2px solid #ff4d00; padding-bottom: 10px; margin-top: 0;">🚀 New Website Campaign Lead</h2>
      <p style="color: #333333; font-size: 15px;">A new lead has submitted a campaign brief on BrandQube India website.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 10px; font-weight: bold; width: 120px; border-bottom: 1px solid #eee; color: #555;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #111;">${enquiry.name || ""}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${enquiry.email}" style="color: #009be3;">${enquiry.email || 'N/A'}</a></td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${enquiry.phone}" style="color: #009be3;">${enquiry.phone || 'N/A'}</a></td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">City:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #111;">${enquiry.city || 'N/A'}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Channels:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #ff4d00; font-weight: bold;">${channelsList}</td></tr>
        ${enquiry.budget ? `<tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Budget:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #111;">${enquiry.budget}</td></tr>` : ''}
        ${enquiry.message ? `<tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Message:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #111;">${enquiry.message}</td></tr>` : ''}
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Submitted At:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #777;">${new Date(enquiry.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
      </table>
      <div style="margin-top: 25px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
        BrandQube India Sales Lead System
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${userFormattedSender}" <${authEmail}>`,
    to: recipient,
    replyTo: enquiry.email || recipient,
    subject: `New Lead: ${enquiry.name || 'Anonymous'} (${enquiry.city || 'Bhopal'})`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[enquiries] Email sent to ${recipient}. ID: ${info.messageId}`);
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error("[enquiries Nodemailer error]", err);
    return { ok: false, error: (err as Error).message };
  }
}

export async function sendCareerApplicationEmail(application: {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  portfolio?: string;
  coverLetter?: string;
  createdAt?: string | Date;
}) {
  const recipient = process.env.CAREERS_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || "priyanshgupta2307@gmail.com";
  const authEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "sales@brandqubeindia.com";

  const userFormattedSender = application.name
    ? `${application.name} <${application.email || "No email provided"}>`
    : (application.email || "BrandQube Job Applicant");

  const transporter = getTransporter();
  if (!transporter) {
    console.log("[careers] SMTP credentials not configured. Skipping email dispatch.");
    return { ok: false, error: "SMTP credentials missing in env" };
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #009be3; border-bottom: 2px solid #009be3; padding-bottom: 10px; margin-top: 0;">💼 New Career Application</h2>
      <p style="color: #333333; font-size: 15px;">A new candidate has submitted a job application on BrandQube India website.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 10px; font-weight: bold; width: 120px; border-bottom: 1px solid #eee; color: #555;">Applicant:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #111;">${application.name || ""}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Position:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #009be3; font-weight: bold;">${application.position || 'General Application'}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${application.email}" style="color: #009be3;">${application.email || 'N/A'}</a></td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${application.phone}" style="color: #009be3;">${application.phone || 'N/A'}</a></td></tr>
        ${application.portfolio ? `<tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Portfolio / CV:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="${application.portfolio}" target="_blank" style="color: #009be3;">${application.portfolio}</a></td></tr>` : ''}
        ${application.coverLetter ? `<tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Cover Letter:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #111;">${application.coverLetter}</td></tr>` : ''}
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Applied At:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #777;">${new Date(application.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
      </table>
      <div style="margin-top: 25px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
        BrandQube India Careers Portal
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${userFormattedSender}" <${authEmail}>`,
    to: recipient,
    replyTo: application.email || recipient,
    subject: `Job Application: ${application.name} - ${application.position || 'General'}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[careers] Email sent to ${recipient}. ID: ${info.messageId}`);
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error("[careers Nodemailer error]", err);
    return { ok: false, error: (err as Error).message };
  }
}
