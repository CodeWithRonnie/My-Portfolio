import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ReactPlayer from 'react-player';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import projectsData, { ProjectData } from '../data/projectsData';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { Text, PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Project Card Component
const ProjectCard3D = ({ project, position, rotation = [0, 0, 0] }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((_, delta) => {
    if (mesh.current) {
      // Subtle animation
      if (hovered) {
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, rotation[1] + 0.2, 0.1);
        mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, position[2] + 0.3, 0.1);
      } else {
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, rotation[1], 0.1);
        mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, position[2], 0.1);
      }
    }
  });

  // Create a texture from the project image
  const texture = new THREE.TextureLoader().load(project.image);
  
  return (
    <group position={position} rotation={rotation}>
      <mesh 
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2.5, 1.6, 0.1]} />
        <meshStandardMaterial 
          map={texture}
          metalness={0.2}
          roughness={0.8}
          color={hovered ? "#ffffff" : "#cccccc"}
        />
        
        <Text
          position={[0, -1, 0.1]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          maxWidth={2}
          textAlign="center"
          font="/fonts/Poppins-Bold.woff"
        >
          {project.title}
        </Text>
        
        <Text
          position={[0, -1.15, 0.1]}
          fontSize={0.08}
          color="#c0b5e6"
          anchorX="center"
          anchorY="top"
          maxWidth={2}
          textAlign="center"
          font="/fonts/Poppins-Regular.woff"
        >
          {project.category}
        </Text>
      </mesh>
    </group>
  );
};

// 3D Projects Showcase
const ProjectsShowcase3D = ({ projects }) => {
  const groupRef = useRef();
  
  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
    >
      <group ref={groupRef}>
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <ProjectCard3D 
            project={projects[0]} 
            position={[-2.8, 0, 0]} 
            rotation={[0, 0.2, 0]}
          />
          
          <ProjectCard3D 
            project={projects[1]} 
            position={[0, 0, 0.5]} 
            rotation={[0, 0, 0]}
          />
          
          <ProjectCard3D 
            project={projects[2]} 
            position={[2.8, 0, 0]} 
            rotation={[0, -0.2, 0]}
          />
        </Float>
      </group>
    </PresentationControls>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Display featured projects first, then other projects
  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
  const visibleProjects = showAllProjects 
    ? sortedProjects 
    : sortedProjects.slice(0, 3);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="projects" className="py-20 bg-[var(--secondary)]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          My <span className="text-[var(--primary)]">Projects</span>
        </motion.h2>
        
        {/* 3D Projects Showcase */}
        <motion.div
          className="h-[400px] w-full mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <ProjectsShowcase3D projects={sortedProjects.slice(0, 3)} />
          </Canvas>
          
          <div className="text-center text-[var(--grey-light)] mt-4">
            <p>Interact with the 3D project cards above!</p>
          </div>
        </motion.div>
        
        {/* Regular Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visibleProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
        
        {projectsData.length > 3 && (
          <div className="text-center mb-16">
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="btn"
            >
              {showAllProjects ? 'Show Less' : 'View More Projects'}
            </button>
          </div>
        )}
        
        <motion.div
          className="max-w-4xl mx-auto bg-[var(--background)] p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Project Showcase Video</h3>
          <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with your actual video URL
              width={isFullscreen ? "100%" : "100%"}
              height={isFullscreen ? "100vh" : "500px"}
              controls={true}
              playing={isFullscreen}
              className="mx-auto"
            />
            <button 
              onClick={handleFullscreen}
              className="absolute top-4 right-4 bg-[var(--primary)] text-white px-3 py-1 rounded z-10"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  isInView: boolean;
}

const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  return (
    <motion.div 
      className={`bg-[var(--background)] rounded-lg overflow-hidden group ${project.featured ? 'ring-2 ring-[var(--primary)]' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="relative overflow-hidden h-52">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[var(--primary)]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-4">
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                className="p-3 bg-white text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View Repository"
              >
                <FiGithub size={20} />
              </a>
            )}
            <a 
              href={project.link} 
              className="p-3 bg-white text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Live Demo"
            >
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-0 right-0 bg-[var(--primary)] text-white text-xs font-bold px-2 py-1">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="text-[var(--primary)] text-sm mb-2">{project.category}</div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-[var(--grey-light)] mb-4">{project.description}</p>
        
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="text-xs bg-[var(--secondary)] text-[var(--grey-light)] px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
