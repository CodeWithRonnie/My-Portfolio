/**
 * Projects Data
 * 
 * This file contains data for all your projects. 
 * To add a new project, simply add a new object to the array below.
 * 
 * As a web developer, tech enthusiast, and aspiring full stack developer,
 * this is where you can showcase your technical achievements and projects.
 */

export interface ProjectData {
  title: string;
  category: string;
  image: string;
  description: string;
  link: string; // Live demo link
  repoUrl?: string; // GitHub or other repository URL
  technologies?: string[]; // Technologies used in the project
  featured?: boolean; // Set to true to highlight special projects
}

const projectsData: ProjectData[] = [
  {
    title: "Portfolio Website",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    description: "A personal portfolio website built with React and Tailwind CSS.",
    link: "#",
    repoUrl: "https://github.com/yourusername/portfolio-website",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true
  },
  {
    title: "E-commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    description: "A fully functional online store with payment integration.",
    link: "#",
    repoUrl: "https://github.com/yourusername/ecommerce-platform",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
  },
  {
    title: "Mobile App UI",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    description: "User interface design for a fitness tracking mobile application.",
    link: "#",
    repoUrl: "https://github.com/yourusername/fitness-app-ui",
    technologies: ["Figma", "Adobe XD", "Sketch"]
  }
];

export default projectsData;
