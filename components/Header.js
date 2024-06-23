import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  let lastScrollY = 0;
  let scrollTimeout;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowHeader(false); // Scroll Down
    } else {
      setShowHeader(true); // Scroll Up
    }
    lastScrollY = window.scrollY;

    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setShowHeader(true); // Show header when scrolling stops
    }, 200);
  };

  const handleSectionChange = () => {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100; // Adjust for offset

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        setActiveSection(section.getAttribute("id"));
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "glasseffect" : "bg-transparent"}`}
      style={{ transition: 'all 0.3s ease-in-out' }}
    >
      <nav className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between rounded-md">
        <div className="flex items-center">
          <a
            href="#hero"
            className="block lg:hidden h-8 w-auto text-white text-2xl font-bold"
          >
            nojin.site
          </a>
          <a
            href="#hero"
            className="hidden lg:block h-8 w-auto text-white text-2xl font-bold"
          >
            nojin.site
          </a>
        </div>
        <div className="hidden md:block">
          <div className="flex space-x-4">
            <motion.a
              href="#hero"
              className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#about"
              className={`nav-link ${
                activeSection === "about" ? "active" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              About
            </motion.a>
            <motion.a
              href="#certificates"
              className={`nav-link ${
                activeSection === "certificates" ? "active" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Certificates
            </motion.a>
            <motion.a
              href="#projects"
              className={`nav-link ${
                activeSection === "projects" ? "active" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Projects
            </motion.a>
            <motion.a
              href="#contact"
              className={`nav-link ${
                activeSection === "contact" ? "active" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <XIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden transition-transform duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <motion.a
            href="#hero"
            className={`nav-link block ${
              activeSection === "hero" ? "active" : ""
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Home
          </motion.a>
          <motion.a
            href="#about"
            className={`nav-link block ${
              activeSection === "about" ? "active" : ""
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            About
          </motion.a>
          <motion.a
            href="#projects"
            className={`nav-link block ${
              activeSection === "projects" ? "active" : ""
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Projects
          </motion.a>
          <motion.a
            href="#certificates"
            className={`nav-link block ${
              activeSection === "certificates" ? "active" : ""
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Certificates
          </motion.a>
          <motion.a
            href="#contact"
            className={`nav-link block ${
              activeSection === "contact" ? "active" : ""
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Contact
          </motion.a>
        </div>
      </div>
    </header>
  );
};

export default Header;
