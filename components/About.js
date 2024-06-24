import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { FaUser, FaSchool, FaCamera } from 'react-icons/fa';

const calculateAge = (birthdate) => {
  const now = dayjs();
  const birthDate = dayjs(birthdate);
  return now.diff(birthDate, 'year');
};

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

  useEffect(() => {
    setAge(calculateAge(birthdate));
    setTimeLeft(calculateTimeUntilNextBirthday(birthdate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeUntilNextBirthday(birthdate));
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdate]);

  if (timeLeft === null || age === null) {
    return null;
  }

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <section id="about" className="py-16 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <motion.p
              className="text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hello! My name is Raffi Aqsan, but I usually go by Nojin. I'm a student at SMK Muhammadiyah 15 Jakarta. I have a passion for photography and programming. I love creating interactive and responsive web applications, and I am dedicated to continuously improving my skills and keeping up with the latest trends in web development.
            </motion.p>
            <motion.div
              className="flex flex-wrap space-x-4 items-center justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img src="/icons8-html-logo.svg" alt="HTML5" className="h-24 md:h-32 lg:h-40 hover:scale-110 transition-transform duration-300" />
              <img src="/icons8-css-logo.svg" alt="CSS3" className="h-24 md:h-32 lg:h-40 hover:scale-110 transition-transform duration-300" />
              <img src="/icons8-javascript.svg" alt="JavaScript" className="h-24 md:h-32 lg:h-40 hover:scale-110 transition-transform duration-300" />
              <img src="/icons8-php-logo.svg" alt="PHP" className="h-24 md:h-32 lg:h-40 hover:scale-110 transition-transform duration-300" />
              <img src="/icons8-node-js.svg" alt="Node.js" className="h-24 md:h-32 lg:h-40 hover:scale-110 transition-transform duration-300" />
            </motion.div>
          </div>
          <div className="space-y-4">
            <motion.div 
              className="glasseffect p-4 rounded-lg flex items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FaUser className="text-4xl text-yellow-400 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Name</h3>
                <p>Nojin / Raffi</p>
              </div>
            </motion.div>
            <motion.div 
              className="glasseffect p-4 rounded-lg flex items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <FaSchool className="text-4xl text-blue-400 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Education</h3>
                <p>Student at SMK Muhammadiyah 15 Jakarta</p>
              </div>
            </motion.div>
            <motion.div 
              className="glasseffect p-4 rounded-lg flex items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <FaCamera className="text-4xl text-pink-400 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Hobbies</h3>
                <p>Photography and Programming</p>
              </div>
            </motion.div>
            <motion.div 
              className="glasseffect p-4 rounded-lg flex flex-col items-center hover:bg-opacity-75 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
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
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold">{days}</span>
                    <span className="text-sm md:text-base">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold">{hours}</span>
                    <span className="text-sm md:text-base">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold">{minutes}</span>
                    <span className="text-sm md:text-base">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold">{seconds}</span>
                    <span className="text-sm md:text-base">Seconds</span>
                  </div>
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
