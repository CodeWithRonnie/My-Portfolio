import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-[var(--secondary)] relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          About <span className="text-[var(--primary)]">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-[400px] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]/70 rounded-lg relative z-10 overflow-hidden">
              {/* This would be replaced with an actual image in a real implementation */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                Your Photo Here
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-[var(--primary)] rounded-lg z-0"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Get to know me</h3>
            <p className="text-[var(--grey-light)] mb-6">
              Hello! I'm Mamikie Maemu, a passionate web developer and tech enthusiast with a drive for creating beautiful, functional websites. I combine technical expertise with innovative problem-solving to build memorable digital experiences.
            </p>
            <p className="text-[var(--grey-light)] mb-6">
              With strong skills in HTML, CSS, JavaScript, and React, I transform concepts into reality. As an aspiring full stack developer, I'm constantly expanding my knowledge of backend technologies to complement my frontend expertise.
            </p>
            <p className="text-[var(--grey-light)] mb-8">
              When I'm not coding, you can find me exploring emerging technologies, contributing to open-source projects, or attending tech meetups to stay at the cutting edge of the industry.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-bold text-[var(--primary)]">Name:</h4>
                <p className="text-[var(--grey-light)]">Maemu</p>
              </div>
              <div>
                <h4 className="font-bold text-[var(--primary)]">Email:</h4>
                <p className="text-[var(--grey-light)]">your.email@example.com</p>
              </div>
              <div>
                <h4 className="font-bold text-[var(--primary)]">Location:</h4>
                <p className="text-[var(--grey-light)]">Your City, Country</p>
              </div>
              <div>
                <h4 className="font-bold text-[var(--primary)]">Availability:</h4>
                <p className="text-[var(--grey-light)]">Freelance / Full-time</p>
              </div>
            </div>
            
            <a href="#contact" className="btn">Contact Me</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
