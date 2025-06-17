import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Project', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0e0e2c]/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="text-xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center space-x-2">
            <div className="text-xl text-white font-bold tracking-wider flex items-center">
              <div className="flex items-center justify-center bg-gradient-to-r from-[#e83a7c] to-[#8a56e0] w-9 h-9 rounded-full">
                <span className="text-white font-bold text-sm">MM</span>
              </div>
              <span className="ml-2">Mamikie</span>
            </div>
          </div>
        </motion.a>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`relative px-4 py-2 rounded-full transition-colors ${
                activeSection === item.href.substring(1) 
                  ? 'text-white' 
                  : 'text-[var(--grey-light)] hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute inset-0 bg-[var(--primary)]/20 rounded-full"
                  layoutId="navHighlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </motion.a>
          ))}
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleNav} 
            className="text-2xl text-[var(--text)] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {navActive ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {navActive && (
          <motion.div 
            className="md:hidden bg-[#1a1a1a]/95 backdrop-blur-md absolute top-full left-0 w-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto py-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className={`block py-3 px-4 my-2 rounded-lg text-center ${
                    activeSection === item.href.substring(1)
                      ? 'bg-[var(--primary)]/20 text-white'
                      : 'text-[var(--grey-light)] hover:text-white'
                  }`}
                  onClick={toggleNav}
                  whileHover={{ x: 10, backgroundColor: 'rgba(232, 58, 124, 0.1)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
