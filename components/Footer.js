import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="bg-transparent py-8 text-center relative overflow-hidden">
    <div className="absolute inset-0"></div>
    <div className="relative z-10">
      <p className="text-white text-xl font-bold mb-4">&copy; Raffi Aqsan / Nojin</p>
      <div className="mt-4 flex justify-center">
        <motion.a
          href="https://trakteer.id/NojsNojin"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white text-white px-4 py-2 rounded-full flex items-center justify-center max-w-xs w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FaHeart className="mr-2" /> Support me on Trakteer
        </motion.a>
      </div>
      <div className="mt-4">
        <p className="text-white text-sm">
          Made with ❤️ by Nojin. Follow me on social media for more updates.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
