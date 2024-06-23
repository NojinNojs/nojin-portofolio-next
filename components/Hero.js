import { useEffect, useState } from "react";
import { FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { motion } from 'framer-motion';

const Typewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 70,
  delaySpeed = 1500,
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [delta, setDelta] = useState(typeSpeed);

  useEffect(() => {
    if (index === words.length) {
      setIndex(0);
    }

    if (subIndex === words[index].length + 1 && !deleting) {
      setDeleting(true);
      setDelta(delaySpeed);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      setDelta(typeSpeed);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setDelta(deleting ? deleteSpeed : typeSpeed);
    }, delta);

    return () => clearTimeout(timeout);
  }, [
    subIndex,
    index,
    deleting,
    delta,
    words,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
  ]);

  useEffect(() => {
    const blinkTimeout = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <span>{`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}</span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center text-white p-4 md:p-8">
      <motion.div 
        className="w-full md:w-1/2 flex flex-col items-start justify-center text-left space-y-2 md:space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex flex-row space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="text-xs md:text-sm text-white px-2 py-1 rounded-20 mb-2 md:mb-3 glasseffect"
            whileHover={{ scale: 1.1 }}
          >
            Programmer
          </motion.div>
          <motion.div 
            className="text-xs md:text-sm text-white px-2 py-1 rounded-20 mb-2 md:mb-3 glasseffect"
            whileHover={{ scale: 1.1 }}
          >
            Nojin Portfolio
          </motion.div>
          <motion.div 
            className="text-xs md:text-sm text-white px-2 py-1 rounded-20 mb-2 md:mb-3 glasseffect"
            whileHover={{ scale: 1.1 }}
          >
            Photographer
          </motion.div>
        </motion.div>
        <h1 className="text-2xl md:text-5xl font-bold md:mb-3 h-16 md:h-24">
          console.log("
          <Typewriter
            words={[
              'Welcome to Nojin Website")',
              'Explore My Projects")',
              'Discover More")',
            ]}
            typeSpeed={100}
            deleteSpeed={70}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-sm md:text-lg mb-2 md:mb-4">
          I'm a Junior Programmer. Problem solving is my passion. Interested with me? View my projects below then contact me.
        </p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <motion.a
            href="#projects"
            className="btn-glow flex items-center justify-center glasseffect"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaProjectDiagram className="mr-2" /> View Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-glow flex items-center justify-center glasseffect"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaEnvelope className="mr-2" /> Contact Me
          </motion.a>
        </div>
      </motion.div>
      <motion.div 
        className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/programming.svg"
          alt="Programming Illustration"
          className="w-2/3 md:w-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
