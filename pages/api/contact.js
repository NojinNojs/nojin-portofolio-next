import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, recaptchaToken } = req.body;

    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({ message: 'Invalid name' });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!message || message.length < 10 || message.length > 1000) {
      return res.status(400).json({ message: 'Invalid message' });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    try {
      const recaptchaResponse = await fetch(verifyUrl, {
        method: 'POST',
      });
      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      return res.status(500).json({ message: 'Error verifying reCAPTCHA' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
