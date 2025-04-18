import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Feedback from '../Models/Feedback.js';

dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.post('/submit-feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newFeedback = new Feedback({ name, email, feedback });
        await newFeedback.save();

        const mailOptions = {
            from: `"E-commerce Support" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Thank you for your feedback, ${name}!`,
            html: `
                <p>Hi <strong>${name}</strong>,</p>
                <p>We have received your feedback:</p>
                <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">"${feedback}"</blockquote>
                <p>We appreciate your input and will get back to you soon.</p>
                <p>Best Regards,<br><strong>E-commerce Team</strong></p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Feedback submitted successfully and email sent!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

export default router;