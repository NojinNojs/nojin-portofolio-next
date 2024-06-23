import React, { useState } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { FaExpand, FaTimes } from 'react-icons/fa';

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
    padding: '20px',
    zIndex: 8000,
    width: '90%',
    maxWidth: '800px',
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

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCertificate(null);
    setIsFullscreen(false); // Ensure fullscreen mode is off when closing modal
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="certificates" className="container mx-auto py-20 px-4 md:px-0">
      <h2 className="text-4xl font-bold mb-8 text-center">Certificates</h2>
      <div className="flex justify-center flex-wrap gap-8">
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className="relative card bg-base-100 shadow-xl cursor-pointer w-full sm:w-72 md:w-80 lg:w-96"
            onClick={() => openModal(certificate)}
          >
            <figure className="overflow-hidden flex items-center justify-center h-60">
              <img src={certificate.images[0]} alt={certificate.title} className="object-cover w-full h-full transition-all duration-300 hover:blur-sm" />
            </figure>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <h2 className="text-white text-xl font-bold mb-2">{certificate.title}</h2>
              <p className="text-white text-sm">Click to view details</p>
            </div>
          </div>
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
              autoPlay={true}
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
    </section>
  );
};

export default Certificates;