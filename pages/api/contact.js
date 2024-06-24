import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, recaptchaToken } = req.body;

    // Validate inputs
    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({ message: 'Invalid name' });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!message || message.length < 20 || message.length > 1000) {
      return res.status(400).json({ message: 'Invalid message' });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    try {
      const recaptchaResponse = await fetch(verifyUrl, { method: 'POST' });
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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); color: #fff; background: linear-gradient(to right, #000428, #004e92);">
          <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 10px;">
            <img src="https://nojin.site/android-chrome-512x512.png" alt="Nojin Logo" style="width: 25px; height: 25px;">
            <h1 style="margin: 0; font-size: 24px;">nojin.site</h1>
          </header>
          <main style="padding: 20px 0;">
            <h1 style="font-size: 22px; margin-bottom: 20px;">Submitted Form By ${name}</h1>
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 20px;"><strong>Message:</strong></p>
            <div style="padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px; box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);">
              ${message}
            </div>
          </main>
          <footer style="margin-top: 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 10px;">
            <p style="font-size: 14px; margin: 0;">&copy; 2024 nojin.site. All rights reserved.</p>
          </footer>
        </div>
      `
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
