import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDiscord, FaGithub, FaInstagram, FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import dotenv from 'dotenv';

dotenv.config();

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [messageLength, setMessageLength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'message') {
      setMessageLength(value.length);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameRegex = /^[a-zA-Z ]+$/; // Supports letters and spaces

    if (!formData.name || !nameRegex.test(formData.name) || formData.name.length < 2 || formData.name.length > 100) {
      setAlert({ show: true, type: 'error', message: 'Name must be between 2 and 100 characters, and contain only letters.' });
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setAlert({ show: true, type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.message || formData.message.length < 20 || formData.message.length > 1000) {
      setAlert({ show: true, type: 'error', message: 'Message must be between 20 and 1000 characters.' });
      return;
    }

    setIsLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha('submit');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, recaptchaToken })
      });

      const result = await response.json();
      if (response.ok) {
        setAlert({ show: true, type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setMessageLength(0);
      } else {
        setAlert({ show: true, type: 'error', message: `Failed to send message: ${result.message}` });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setAlert({ show: true, type: 'error', message: 'An error occurred while sending the message.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
    }
  };

  return (
    <section id="contact" className="container mx-auto py-20 px-4 md:px-0">
      <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8">
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-auto w-full">
          <motion.label
            className="block mb-4"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white block mb-2">Name:</span>
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="mt-1 block w-full rounded-lg bg-transparent bg-opacity-50 border-none border-b-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300 p-2"
              whileHover={{ scale: 1.02 }}
            />
          </motion.label>
          <motion.label
            className="block mb-4"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white block mb-2">Email:</span>
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="mt-1 block w-full rounded-lg bg-transparent bg-opacity-50 border-none border-b-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300 p-2"
              whileHover={{ scale: 1.02 }}
            />
          </motion.label>
          <motion.label
            className="block mb-4 relative"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white block mb-2">Message:</span>
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className={`mt-1 block w-full rounded-lg bg-transparent bg-opacity-50 border-none border-b-2 text-white placeholder-gray-400 focus:outline-none transition duration-300 p-2 ${messageLength === 0 ? 'border-white' : (messageLength < 20 || messageLength > 1000 ? 'border-red-500' : 'border-green-500')}`}
              whileHover={{ scale: 1.02 }}
            ></motion.textarea>
            <span className={`absolute right-0 bottom-0 text-sm pr-2 pb-1 ${messageLength === 0 ? 'text-white' : (messageLength < 20 || messageLength > 1000 ? 'text-red-500' : 'text-green-500')}`}>{messageLength} / 1000</span>
          </motion.label>
          <motion.button
            type="submit"
            className="mt-4 px-4 py-2 btn-glow glasseffec text-white rounded-lg ml-auto flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaPaperPlane className="mr-2" />
            )}
            {isLoading ? 'Sending...' : 'Send'}
          </motion.button>
        </form>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <motion.a
          href={process.env.REACT_APP_INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
          whileHover={{
            scale: 1.1,
            filter: 'drop-shadow(0 0 10px #E4405F)',
            transition: { duration: 0.3 },
            color: '#E4405F'
          }}
          whileTap={{ scale: 0.95 }}
          style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
        >
          <FaInstagram size={32} />
        </motion.a>
        <motion.a
          href={process.env.REACT_APP_DISCORD_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
          whileHover={{
            scale: 1.1,
            filter: 'drop-shadow(0 0 10px #7289da)',
            transition: { duration: 0.3 },
            color: '#7289da'
          }}
          whileTap={{ scale: 0.95 }}
          style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
        >
          <FaDiscord size={32} />
        </motion.a>
        <motion.a
          href={`https://github.com/${process.env.REACT_APP_GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
          whileHover={{
            scale: 1.1,
            filter: 'drop-shadow(0 0 10px #fff)',
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
        >
          <FaGithub size={32} />
        </motion.a>
      </div>
      <p className="text-lg mt-8 text-center">
        You can also reach me via email at <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-red-600">{process.env.NEXT_PUBLIC_EMAIL}</a>.
      </p>
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed bottom-4 right-4 transform -translate-y-1/2 p-4 rounded-md shadow-md z-50 ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {alert.type === 'success' ? <FaCheckCircle className="inline mr-2" /> : <FaExclamationCircle className="inline mr-2" />}
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
