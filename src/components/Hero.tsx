import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { HeroModel } from './3d/HeroModel';
import { ThreeDBackground } from './3d/ThreeDBackground';

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Front-end Web Developer";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to the section
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="min-h-screen relative overflow-hidden flex items-center">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ThreeDBackground />
        </Canvas>
      </div>
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e2c]/65 via-[#1e1a45]/60 to-[#2d1b4d]/55 backdrop-blur-sm z-10">
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.4 + 0.1})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Gradient overlay with more transparency */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e2c]/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.p 
              className="inline-block px-4 py-1 bg-[#8a56e0]/30 backdrop-blur-md text-[#b69fff] text-sm md:text-base rounded-full mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.p>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-white">I'm </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e83a7c] to-[#8a56e0] text-shadow-custom">
                Mamikie Maemu
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl font-medium mb-6 text-[#c0b5e6] h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {text}<span className="animate-pulse">|</span>
            </motion.h2>
            
            <motion.p
              className="text-[#9f97c2] mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              I create engaging, responsive websites with clean code and creative designs that deliver exceptional user experiences.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <a 
                href="#projects" 
                className="px-8 py-3 bg-gradient-to-r from-[#e83a7c] to-[#d7438d] text-white font-medium uppercase tracking-wider rounded-md hover:shadow-lg hover:shadow-[#e83a7c]/30 transition-all"
              >
                My Projects
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 bg-transparent border border-[#8a56e0] text-white font-medium uppercase tracking-wider rounded-md hover:bg-[#8a56e0]/10 transition-all"
              >
                Contact Me
              </a>
            </motion.div>
            
            {/* Social Media Icons */}
            <motion.div
              className="flex justify-center lg:justify-start gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#c0b5e6] hover:text-white transition-colors p-3 bg-[#20193a] rounded-full hover:shadow-lg hover:shadow-[#8a56e0]/20"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#c0b5e6] hover:text-white transition-colors p-3 bg-[#20193a] rounded-full hover:shadow-lg hover:shadow-[#8a56e0]/20"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </motion.div>
          </motion.div>
          
          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block h-[500px]"
          >
            <div className="relative w-full h-full">
              <Canvas shadows>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <HeroModel mousePosition={mousePosition} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.5}
                  rotateSpeed={0.5}
                />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
