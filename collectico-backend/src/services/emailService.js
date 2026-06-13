import nodemailer from "nodemailer";

let cachedTransport = null;

function getTransport() {
  if (cachedTransport) {
    return cachedTransport;
  }

  const host = process.env.SMTP_HOST;

  if (!host) {
    return null;
  }

  cachedTransport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  return cachedTransport;
}

export async function sendPasswordResetEmail(to, link) {
  const transport = getTransport();

  // Dev fallback: with no SMTP configured, log the link instead of throwing so
  // the reset flow stays testable without a real mail server.
  if (!transport) {
    console.log(
      `[emailService] (no SMTP configured) password reset link for ${to}: ${link}`,
    );
    return;
  }

  const from =
    process.env.SMTP_FROM || "Collectico <no-reply@collectico.local>";

  await transport.sendMail({
    from,
    to,
    subject: "Reset your Collectico password",
    text: `You requested a password reset. Open this link to choose a new password:\n\n${link}\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>You requested a password reset.</p><p><a href="${link}">Click here to choose a new password</a></p><p>If you did not request this, you can ignore this email.</p>`,
  });
}
