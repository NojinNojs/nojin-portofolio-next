import { useState, useEffect, useCallback } from "react";
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

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // Scroll Down
      } else {
        setShowHeader(true); // Scroll Up
      }

      lastScrollY = currentScrollY;

      if (currentScrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowHeader(true); // Show header when scrolling stops
      }, 200);
    });
  }, []);

  const handleSectionChange = useCallback(() => {
    requestAnimationFrame(() => {
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
    });
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu on link click (for mobile)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, [handleScroll, handleSectionChange]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ type: "tween", duration: 0.05 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 glasseffect ${
        isScrolled ? "shadow-lg" : "shadow-none"
      }`}
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
            {["hero", "about", "certificates", "projects", "contact"].map(
              (section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`nav-link ${
                    activeSection === section ? "active" : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.a>
              )
            )}
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
          {["hero", "about", "certificates", "projects", "contact"].map(
            (section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className={`nav-link block ${
                  activeSection === section ? "active" : ""
                }`}
                onClick={handleLinkClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            )
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
