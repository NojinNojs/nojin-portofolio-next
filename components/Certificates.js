import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

const certificates = [
  {
    title: 'HTML & CSS Certificate',
    images: [
      '/sertifikat-html-css-dicoding/sertif-html-css-dicoding-1.svg',
      '/sertifikat-html-css-dicoding/sertif-html-css-dicoding-2.svg',
      '/sertifikat-html-css-dicoding/sertif-html-css-dicoding-3.svg'
    ],
    description: 'Certified by Dicoding Academy',
  },
  {
    title: 'Codepolitan HTML Certificate',
    images: [
      '/codepolitan-html/codepolitan-html.svg'
    ],
    description: 'Certified by Codepolitan',
  },
  {
    title: 'Codepolitan CSS Certificate',
    images: [
      '/codepolitan-css/codepolitan-css.svg'
    ],
    description: 'Certified by Codepolitan',
  },
  {
    title: 'Certified Developer',
    images: [
      '/alibaba-acc.svg'
    ],
    description: 'Certified by Alibaba Cloud',
  },
  // Tambahkan lebih banyak sertifikat di sini
];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1a202c',
    border: 'none',
    borderRadius: '10px',
    padding: '1.25rem',
    zIndex: 8000,
    width: '90%',
    maxWidth: '50rem',
    maxHeight: '90%',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 8000,
  },
};

const Certificates = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controls = useAnimation();
  const sectionRef = useRef(null);

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCertificate(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  return (
    <motion.section
      ref={sectionRef}
      id="certificates"
      className="container mx-auto py-20 px-4 md:px-0"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    >
      <h2 className="text-4xl font-bold mb-8 text-center">Certificates</h2>
      <div className="flex justify-center flex-wrap gap-8">
        {certificates.map((certificate, index) => (
          <motion.div
            key={index}
            className="relative card bg-base-100 shadow-xl cursor-pointer w-full sm:w-72 md:w-80 lg:w-96"
            onClick={() => openModal(certificate)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <figure className="overflow-hidden flex items-center justify-center h-60">
              <img src={certificate.images[0]} alt={certificate.title} className="object-cover w-full h-full transition-all duration-300 hover:blur-sm" />
            </figure>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <h2 className="text-white text-xl font-bold mb-2">{certificate.title}</h2>
              <p className="text-white text-sm">Click to view details</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCertificate && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Certificate Modal"
          className={isFullscreen ? 'fullscreen' : ''}
        >
          <button onClick={closeModal} className="absolute top-4 right-4 text-white text-2xl">
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center text-white">{selectedCertificate.title}</h2>
          <div className="flex justify-center items-center">
            <Carousel
              showThumbs={false}
              dynamicHeight={false}
              infiniteLoop={true}
              autoPlay={false}
              className="mb-4"
              useKeyboardArrows={true}
              showStatus={false}
              showIndicators={true}
              emulateTouch={true}
              swipeable={true}
            >
              {selectedCertificate.images.map((image, index) => (
                <div key={index} className="flex justify-center">
                  <Zoom>
                    <img src={image} alt={selectedCertificate.title} className="max-h-[60vh] md:max-h-[80vh] object-contain" />
                  </Zoom>
                </div>
              ))}
            </Carousel>
          </div>
          <p className="text-center text-white">{selectedCertificate.description}</p>
          {!isFullscreen && (
            <button className="absolute top-4 left-4 text-white text-2xl" onClick={toggleFullscreen}>
              <FaExpand />
            </button>
          )}
        </Modal>
      )}
    </motion.section>
  );
};

export default Certificates;
