import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiLayout, FiServer, FiSmartphone } from 'react-icons/fi';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaFigma,
  FaGithub,
  FaSass,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiMongodb,
  SiRedux
} from 'react-icons/si';
import { 
  BsFillLightbulbFill, 
  BsPeopleFill, 
  BsClockFill,
  BsChatSquareTextFill
} from 'react-icons/bs';
import { MdOutlineCreate, MdGroupWork } from 'react-icons/md';
import { GiMagnifyingGlass } from 'react-icons/gi';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Web Development",
      description: "Building responsive, performant websites using modern technologies and best practices.",
      icon: <FiCode className="text-3xl" />,
      delay: 0.2
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing interfaces that enhance user experience.",
      icon: <FiLayout className="text-3xl" />,
      delay: 0.4
    },
    {
      title: "Backend Development",
      description: "Developing robust server-side applications and APIs to power your web applications.",
      icon: <FiServer className="text-3xl" />,
      delay: 0.6
    },
    {
      title: "Responsive Design",
      description: "Ensuring your website looks and functions perfectly on all devices and screen sizes.",
      icon: <FiSmartphone className="text-3xl" />,
      delay: 0.8
    }
  ];

  const techSkills = [
    { name: "HTML", icon: <FaHtml5 className="text-[#E34F26] text-4xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6] text-4xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E] text-4xl" /> },
    { name: "React", icon: <FaReact className="text-[#61DAFB] text-4xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-4xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933] text-4xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4] text-4xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248] text-4xl" /> },
    { name: "Redux", icon: <SiRedux className="text-[#764ABC] text-4xl" /> },
    { name: "GitHub", icon: <FaGithub className="text-[#181717] text-4xl" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E] text-4xl" /> },
    { name: "SASS", icon: <FaSass className="text-[#CC6699] text-4xl" /> }
  ];

  const softSkills = [
    { name: "Problem Solving", icon: <BsFillLightbulbFill className="text-yellow-400 text-3xl" /> },
    { name: "Communication", icon: <BsChatSquareTextFill className="text-blue-400 text-3xl" /> },
    { name: "Teamwork", icon: <BsPeopleFill className="text-green-400 text-3xl" /> },
    { name: "Time Management", icon: <BsClockFill className="text-purple-400 text-3xl" /> },
    { name: "Creativity", icon: <MdOutlineCreate className="text-pink-400 text-3xl" /> },
    { name: "Analytical Thinking", icon: <GiMagnifyingGlass className="text-orange-400 text-3xl" /> },
    { name: "Collaboration", icon: <MdGroupWork className="text-teal-400 text-3xl" /> },
    { name: "Adaptability", icon: <FaDatabase className="text-indigo-400 text-3xl" /> }
  ];

  return (
    <section id="skills" className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          What <span className="text-[var(--primary)]">I Do</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-[var(--secondary)] p-6 rounded-lg hover:transform hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: service.delay }}
            >
              <div className="text-[var(--primary)] mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-[var(--grey-light)]">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-10 text-center">Technical Skills</h3>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {techSkills.map((skill, index) => (
              <motion.div 
                key={index}
                className="bg-[var(--secondary)] p-6 rounded-lg flex flex-col items-center justify-center hover:shadow-lg hover:shadow-[var(--primary)]/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="mb-3">{skill.icon}</div>
                <p className="font-medium text-center">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-10 text-center">Soft Skills</h3>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {softSkills.map((skill, index) => (
              <motion.div 
                key={index}
                className="bg-[var(--secondary)] p-6 rounded-lg flex items-center hover:bg-[var(--secondary-light)] transition-colors"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mr-4 p-3 bg-[var(--background)] rounded-full">{skill.icon}</div>
                <p className="font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
