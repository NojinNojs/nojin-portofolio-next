import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import dayjs from 'dayjs';
import { motion, useAnimation } from 'framer-motion';
import { FaUser, FaSchool, FaCamera } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

// Helper function to calculate age
const calculateAge = (birthdate) => {
  const now = dayjs();
  const birthDate = dayjs(birthdate);
  return now.diff(birthDate, 'year');
};

// Helper function to calculate time until next birthday in seconds
const calculateTimeUntilNextBirthday = (birthdate) => {
  const now = dayjs();
  const nextBirthday = dayjs(birthdate).year(now.year());
  if (now.isAfter(nextBirthday)) {
    return nextBirthday.add(1, 'year').diff(now, 'second');
  }
  return nextBirthday.diff(now, 'second');
};

const About = () => {
  const birthdate = '2007-08-31';
  const [age, setAge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once
    threshold: 0.1, // Trigger animation when 10% of the element is visible
  });

  // Calculate age and time left until next birthday
  useEffect(() => {
    setAge(calculateAge(birthdate));
    setTimeLeft(calculateTimeUntilNextBirthday(birthdate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeUntilNextBirthday(birthdate));
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdate]);

  // Start animations when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  if (timeLeft === null || age === null) {
    return null;
  }

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const animationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggeredAnimation = (delay) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  });

  const progressBarVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
  };

  return (
    <section id="about" className="py-16 text-white" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center"
          initial="hidden"
          animate={controls}
          variants={animationVariants}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <motion.p
              className="text-lg md:text-xl"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(0.2)}
            >
              Hello! My name is Raffi Aqsan, but I usually go by Nojin. I'm a student at SMK Muhammadiyah 15 Jakarta. I have a passion for photography and programming.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(0.3)}
            >
              I love creating interactive and responsive web applications. I'm dedicated to continuously improving my skills and keeping up with the latest trends in web development.
            </motion.p>
            <motion.div
              className="flex flex-wrap space-x-4 items-center justify-center md:justify-start"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(0.4)}
            >
              {["html-logo", "css-logo", "javascript", "php-logo", "node-js"].map((icon, index) => (
                <img
                  key={index}
                  src={`/icons8-${icon}.svg`}
                  alt={icon}
                  className="h-24 md:h-32 lg:h-40 hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              ))}
            </motion.div>
          </div>
          <div className="space-y-4">
            <motion.div 
              className="glasseffect p-4 rounded-lg flex items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(0.6)}
            >
              <FaUser className="text-4xl text-yellow-400 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Name</h3>
                <p>Nojin / Raffi</p>
              </div>
            </motion.div>
            <motion.div 
              className="glasseffect p-4 rounded-lg flex items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(0.8)}
            >
              <FaSchool className="text-4xl text-blue-400 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Education</h3>
                <p>Student at SMK Muhammadiyah 15 Jakarta</p>
              </div>
            </motion.div>
            <motion.div 
              className="glasseffect p-4 rounded-lg flex items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(1)}
            >
              <FaCamera className="text-4xl text-pink-400 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Hobbies</h3>
                <p>Photography and Programming</p>
              </div>
            </motion.div>
            <motion.div 
              className="glasseffect p-4 rounded-lg flex flex-col items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial="hidden"
              animate={controls}
              variants={staggeredAnimation(1.2)}
            >
              <h3 className="text-xl font-semibold mb-4">My Age</h3>
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 hover:scale-110 transition-transform duration-300">
                <CircularProgressbar
                  value={100 - (days / 365) * 100}
                  text={`${age}`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathColor: '#f6e05e',
                    textColor: '#f6e05e',
                    trailColor: '#d1d5db',
                  })}
                />
              </div>
              <div className="text-center hover:text-yellow-400 transition-colors duration-300">
                <p className="text-lg md:text-xl">Time until next birthday:</p>
                <div className="flex space-x-2 justify-center mt-2">
                  {[
                    { label: 'Days', value: days },
                    { label: 'Hours', value: hours },
                    { label: 'Minutes', value: minutes },
                    { label: 'Seconds', value: seconds },
                  ].map((time, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-2xl md:text-3xl lg:text-4xl font-bold">{time.value}</span>
                      <span className="text-sm md:text-base">{time.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
