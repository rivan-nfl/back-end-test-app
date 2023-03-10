import nodemailer from 'nodemailer';

export default async function sendEmail(email = '') {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    
    await transporter.sendMail({
        from: "smtp-test@teknolobi.id",
        to: email,
        subject: "Successful Sign Up",
        text: `Hello, Thank you for Signing up in our Application !`,
        // html: "<p>HTML version of the message</p>"
    })
}