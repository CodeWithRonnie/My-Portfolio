import { useRef, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission
    alert('Form submitted! This is a demo, so no actual email is sent.');
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      content: "your.email@example.com",
      link: "mailto:your.email@example.com"
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      content: "+1 234 567 8900",
      link: "tel:+12345678900"
    },
    {
      icon: <FiMapPin />,
      title: "Location",
      content: "Your City, Country",
      link: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    { icon: <FiLinkedin />, link: "https://linkedin.com" },
    { icon: <FiGithub />, link: "https://github.com" },
    { icon: <FiTwitter />, link: "https://twitter.com" }
  ];

  return (
    <section id="contact" className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Contact <span className="text-[var(--primary)]">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Discuss Your Project</h3>
            <p className="text-[var(--grey-light)] mb-8">
              I'm interested in freelance opportunities – especially ambitious or large projects. 
              However, if you have other requests or questions, don't hesitate to contact me.
            </p>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  className="flex items-center group"
                  target={item.title === 'Location' ? '_blank' : ''}
                  rel={item.title === 'Location' ? 'noopener noreferrer' : ''}
                >
                  <div className="text-[var(--primary)] bg-[var(--secondary)] p-3 rounded-full mr-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-[var(--grey-light)]">{item.content}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  className="text-[var(--primary)] bg-[var(--secondary)] p-3 rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-[var(--secondary)] p-8 rounded-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-[var(--grey-light)] mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-[var(--background)] text-[var(--text)] p-3 rounded border border-[var(--secondary-light)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-[var(--grey-light)] mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[var(--background)] text-[var(--text)] p-3 rounded border border-[var(--secondary-light)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-[var(--grey-light)] mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-[var(--background)] text-[var(--text)] p-3 rounded border border-[var(--secondary-light)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-[var(--grey-light)] mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-[var(--background)] text-[var(--text)] p-3 rounded border border-[var(--secondary-light)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn w-full"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
