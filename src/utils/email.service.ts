import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string; }) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Example, adjust as needed
    host: 'smtp.gmail.com',
    port: 465, // Change to 587 if needed
    secure: true, // Use TLS (secure: false for 587 or 25)
    auth: {
      user: 'gorkhacoin@gmail.com',
      pass: 'emzc sjow nnra isxx',
    },
    connectionTimeout: 5000,
  });

  await transporter.sendMail({
    from: 'gorkhacoin@gmail.com',
    to,
    subject,
    text,
  });
}
