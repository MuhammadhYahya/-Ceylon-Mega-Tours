import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/contact";

type InquiryMailInput = {
  name: string;
  contact: string;
  email?: string;
  arrivalDate: string;
  groupSize: string;
  serviceType: string;
  message: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  };
}

function buildInquiryText(input: InquiryMailInput) {
  return [
    "New inquiry from Ceylon Mega Tours website",
    "",
    `Name: ${input.name}`,
    `Contact: ${input.contact}`,
    `Email: ${input.email || "Not provided"}`,
    `Arrival date: ${input.arrivalDate}`,
    `Group size: ${input.groupSize}`,
    `Service type: ${input.serviceType}`,
    "",
    "Trip details:",
    input.message
  ].join("\n");
}

export async function sendInquiryEmail(input: InquiryMailInput) {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error("SMTP is not configured.");
  }

  const transporter = nodemailer.createTransport(config);
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || CONTACT_EMAIL;
  const replyTo = input.email || undefined;

  await transporter.sendMail({
    from,
    to: CONTACT_EMAIL,
    replyTo,
    subject: `New inquiry from ${input.name}`,
    text: buildInquiryText(input)
  });
}
