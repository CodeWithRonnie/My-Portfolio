import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[var(--secondary)] py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <motion.a 
                href="#home" 
                className="text-2xl font-bold flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[var(--primary)] text-shadow">Mamikie</span>
                <span className="ml-2">Maemu</span>
              </motion.a>
            </div>
            <p className="text-[var(--grey-light)] mt-2">Front-end Web Developer</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-[var(--grey-light)]">
              &copy; {currentYear} Mamikie Maemu. All rights reserved.
            </p>
            <p className="text-[var(--grey-light)] mt-1">
              Designed & Built with <span className="text-[var(--primary)]">♥</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
