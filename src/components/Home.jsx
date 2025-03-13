import React, { useEffect, useRef, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Code2, Brain, Trophy, Sparkles, ExternalLink, Github, Linkedin, Mail, ChevronDown, Terminal, Zap, ArrowDown, Rocket, Star, Phone } from 'lucide-react';
import '../styles/Home.css';
import profilePic from '../assets/profile.jpg';

const Home = () => {
  // Refs for interactive elements
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const textRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For parallax effect on scroll
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // For the typing effect
  const roles = useMemo(() => ["AI Specialist", "React Developer", "Competitive Programmer", "Full Stack Developer"], []);
  const [currentRole, setCurrentRole] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  // For the floating elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // For the typing effect
  useEffect(() => {
    const role = roles[currentRole];
    const updateText = () => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1));

        if (displayText.length === role.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1));

        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRole((currentRole + 1) % roles.length);
        }
      }
    };

    const timeout = setTimeout(updateText, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, currentRole, isDeleting, roles]);

  // Handle scroll to projects section
  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced floating elements with more variety
  const floatingElements = [
    { icon: <Terminal className="text-primary/70" />, delay: 0, duration: 8, size: "text-2xl" },
    { icon: <Code2 className="text-primary/70" />, delay: 1, duration: 10, size: "text-xl" },
    { icon: <Zap className="text-primary/70" />, delay: 2, duration: 7, size: "text-2xl" },
    { icon: <Brain className="text-primary/70" />, delay: 3, duration: 9, size: "text-xl" },
    { icon: <Trophy className="text-primary/70" />, delay: 4, duration: 11, size: "text-2xl" },
    { icon: <Rocket className="text-primary/70" />, delay: 5, duration: 8, size: "text-xl" },
    { icon: <Star className="text-primary/70" />, delay: 6, duration: 10, size: "text-2xl" },
  ];

  // Transform values for the profile image parallax effect
  const imageX = useTransform(mouseX, [0, 1000], [-15, 15]);
  const imageY = useTransform(mouseY, [0, 1000], [-15, 15]);
  const imageRotate = useTransform(mouseX, [0, 1000], [-5, 5]);

  // Spring animations for smoother movement
  const springImageX = useSpring(imageX, { stiffness: 100, damping: 30 });
  const springImageY = useSpring(imageY, { stiffness: 100, damping: 30 });
  const springImageRotate = useSpring(imageRotate, { stiffness: 100, damping: 30 });

  return (
    <div className="w-full">
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen w-full relative overflow-hidden flex flex-col justify-center"
        style={{ 
          paddingTop: '5rem', 
          paddingBottom: '2rem' 
        }}
      >
        {/* Simplified background with subtle grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
        </div>

        {/* Simplified floating elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} text-primary/10`}
            style={{
              top: `${15 + (index * 12)}%`,
              left: `${8 + (index * 15)}%`,
              zIndex: 5,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        {/* Main Content Container with improved layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl flex-grow flex items-center">
          <div className="flex flex-col items-center w-full">
            
            {/* Name with gradient and animated reveal - Centered at top */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-center"
            >
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Suresh Kumar
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-blue-600 to-indigo-500 mt-2 rounded-full"
              />
            </motion.h1>

            {/* Profile Image with Tech Badges - Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative mb-10 mt-4"
            >
              {/* Enhanced profile image with parallax effect */}
              <motion.div
                className="relative z-10"
                style={{
                  x: springImageX,
                  y: springImageY,
                  rotate: springImageRotate,
                }}
              >
                {/* Enhanced image container with border */}
                <motion.div
                  className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient border with improved styling */}
                  <div className="absolute inset-0 p-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      {/* Image with enhanced quality */}
                      <div className="w-full h-full relative">
                        <img
                          src={profilePic}
                          alt="Suresh Kumar"
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'contrast(1.05) brightness(1.02)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Tech-related floating badges around the image */}
                {[
                  { icon: <Code2 className="h-4 w-4" />, text: "React Developer", position: "-top-4 -right-4" },
                  { icon: <Zap className="h-4 w-4" />, text: "JavaScript Expert", position: "bottom-0 -left-8" },
                  { icon: <Sparkles className="h-4 w-4" />, text: "Front-End Specialist", position: "-bottom-4 right-10" },
                  { icon: <Terminal className="h-4 w-4" />, text: "Web Developer", position: "-top-4 -left-4" },
                
                ].map((badge, index) => (
                  <motion.div
                    key={badge.text}
                    className={`absolute ${badge.position} bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20 shadow-lg flex items-center gap-1.5 z-20`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.2) }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(37, 99, 235, 0.2)",
                    }}
                  >
                    {badge.icon}
                    <span>{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Content Section - Max width for better readability */}
            <div className="max-w-3xl mx-auto text-center">
              {/* Role display with improved styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg sm:text-xl font-medium mb-6"
              >
                <span className="inline-flex items-center gap-3 justify-center">
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Code2 className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent font-semibold">
                    Frontend Architect & React Specialist
                  </span>
                </span>
              </motion.div>

              {/* Description with improved typography and spacing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-muted-foreground space-y-4 mb-8"
              >
                <p className="leading-relaxed text-base">
                  Crafting <span className="text-primary font-medium">pixel-perfect</span> digital experiences with modern web technologies. Transforming ideas into <span className="text-primary font-medium">elegant</span> and <span className="text-primary font-medium">performant</span> solutions.
                </p>

                <p className="leading-relaxed text-base">
                  Expert in building <span className="text-primary font-medium">responsive</span> and <span className="text-primary font-medium">intuitive</span> interfaces that delight users and drive business growth. Passionate about clean code and optimal user experiences.
                </p>
              </motion.div>

              {/* Tech Stack Section with improved styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <motion.div
                    animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-primary"
                  >
                    <Rocket className="h-5 w-5" />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-primary tracking-wider">TECH STACK</h3>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center">
                  {[
                    "React", "JavaScript", "HTML5", "CSS3", "Next.js", "TailwindCSS",
                    "Vite", "Framer Motion", "Lucide React", "Radix UI", "Web Accessibility"
                  ].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + (index * 0.05) }}
                      whileHover={{ scale: 1.1, y: -3 }}
                    >
                      <Badge variant="outline" className="bg-primary/5 py-1.5 px-3.5 text-sm font-medium hover:bg-primary/10 transition-colors duration-300 border-primary/20">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Me Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="flex justify-center mb-8"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Contact Me</span>
                  <Mail className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.a>
              </motion.div>

              {/* Social Links with hover animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="flex gap-4 justify-center"
              >
                {[
                  { icon: <Github className="h-5 w-5" />, url: "https://github.com/Suresh-cs-q", label: "GitHub" },
                  { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/sureshkumar-cs", label: "LinkedIn" },
                  { icon: <Mail className="h-5 w-5" />, url: "mailto:Suresh.manghwar@gmail.com", label: "Email" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center group"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -bottom-8 text-xs font-medium bg-primary/10 px-2 py-1 rounded-md whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section with 3D Cards */}
      <section id="projects" ref={projectsRef} className="w-full relative py-20 bg-background" style={{ scrollMarginTop: '64px' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl">
          {/* Enhanced section title with animated gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block mb-4">
                Featured Projects
              </h2>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Showcasing innovative solutions and technical expertise through real-world applications
            </motion.p>
          </motion.div>

          {/* Enhanced project cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Logic Loom Lab - Agency Website",
                description: "Modern, responsive agency website with smooth animations and contact form functionality. Performance optimized with modular architecture and SEO-friendly structure. Built with React, Vite, and Framer Motion for enhanced user experience.",
                type: "Web Dev",
                tech: ["React", "Vite", "Framer Motion", "EmailJS"],
                link: "https://www.logicloomlab.tech",
                bgColor: "from-blue-600/20 to-indigo-500/20",
                icon: <Code2 className="h-6 w-6 text-primary" />,
                isLive: true
              },
              {
                title: "Movie Recommendation System",
                description: "AI-powered movie recommendation system with personalized suggestions. Features include user authentication, watchlist management, and advanced search. Built with React frontend and Flask backend using machine learning algorithms.",
                type: "AI/ML",
                tech: ["React", "Flask", "Python", "Scikit-learn"],
                link: "https://github.com/Suresh-cs-q/movie-recommendation-system",
                bgColor: "from-indigo-500/20 to-purple-500/20",
                icon: <Brain className="h-6 w-6 text-primary" />,
                isLive: false
              },
              {
                title: "USTC PhD Student Portfolio",
                description: "Professional portfolio website for PhD students at USTC China. Clean and modern design showcasing research work and academic achievements. Responsive layout optimized for academic content presentation.",
                type: "Web Dev",
                tech: ["JavaScript", "CSS", "HTML"],
                link: "https://hameer-chand.vercel.app",
                bgColor: "from-purple-500/20 to-pink-500/20",
                icon: <Trophy className="h-6 w-6 text-primary" />,
                isLive: true
              },
              {
                title: "Unite Digital Academy Website",
                description: "Developed an educational platform website with integrated email authentication for secure user registration. Deployed the platform on Hostinger with optimized performance and security features.",
                type: "Web Dev",
                tech: ["HTML", "CSS", "JavaScript"],
                link: "#",
                bgColor: "from-pink-500/20 to-red-500/20",
                icon: <Rocket className="h-6 w-6 text-primary" />,
                isLive: false
              },
              {
                title: "Digital Billboard Management System",
                description: "Developing a remotely managed billboard system for digital advertisements. Enables real-time content updates and remote control with seamless integration of backend services.",
                type: "Full Stack",
                tech: ["JavaScript", "Node.js", "MongoDB"],
                link: "#",
                bgColor: "from-red-500/20 to-orange-500/20",
                icon: <Zap className="h-6 w-6 text-primary" />,
                isLive: false
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                className="flex"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 group h-full w-full overflow-hidden">
                  {/* Enhanced card header with gradient */}
                  <div className={`h-3 w-full bg-gradient-to-r ${project.bgColor}`}></div>

                  <CardContent className="p-8 relative">
                    {/* Enhanced card background effects */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-10`}
                      animate={{
                        opacity: [0.05, 0.1, 0.05],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${project.bgColor} opacity-20 -rotate-45 transform origin-top-right`}></div>
                    </div>

                    {/* Enhanced content with better spacing */}
                    <div className="relative z-10 space-y-6">
                      {/* Project icon with enhanced animation */}
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${project.bgColor} flex items-center justify-center`}
                        whileHover={{
                          scale: 1.1,
                          rotate: 10,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {project.icon}
                      </motion.div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                          {project.title}
                        </h3>
                        <Badge variant="outline" className="bg-primary/5 mt-1">
                          {project.type}
                        </Badge>
                        <p className="text-muted-foreground mt-2">{project.description}</p>
                      </div>

                      {/* Enhanced tech stack with improved styling */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3 + (i * 0.1),
                            }}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Enhanced project link */}
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-all duration-300 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{project.isLive ? "View Live Demo" : "View Project"}</span>
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="w-full py-20 relative bg-background" style={{ scrollMarginTop: '64px' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl">
          {/* Enhanced section title with animated gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block mb-4">
                Work Experience
              </h2>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Professional journey showcasing expertise in AI, development, and technical leadership
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Enhanced timeline line with gradient and animation */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 via-indigo-500 to-blue-600"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {[
              {
                title: "AI Model Trainer (Freelance)",
                company: "Shipd AI",
                period: "Nov 2024 - Present",
                icon: <Trophy className="h-6 w-6 text-primary" />,
                bgColor: "from-blue-600/20 to-indigo-500/20",
                points: [
                  "Solved complex mathematical problems to enhance AI reasoning",
                  "Provided feedback to optimize model responses",
                  "Assisted in developing high-accuracy AI models"
                ]
              },
              {
                title: "AI Model Trainer",
                company: "Lune AI",
                period: "March 2024 - Sept 2024",
                icon: <Brain className="h-6 w-6 text-primary" />,
                bgColor: "from-indigo-500/20 to-purple-500/20",
                points: [
                  "Trained AI models using curated datasets",
                  "Evaluated AI responses for accuracy",
                  "Improved AI problem-solving in DSA"
                ]
              },
              {
                title: "Prompt Engineer",
                company: "Scale AI",
                period: "June 2023 – Feb 2024",
                icon: <Code2 className="h-6 w-6 text-primary" />,
                bgColor: "from-purple-500/20 to-pink-500/20",
                points: [
                  "Enhanced AI-generated code using Java and Python",
                  "Implemented bug detection techniques",
                  "Optimized prompt engineering workflows"
                ]
              }
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-8 ${index % 2 === 0 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                  } md:w-[calc(50%-2rem)] p-6`}
              >
                {/* Timeline dot with pulse effect */}
                <motion.div
                  className="absolute top-8 left-1/2 md:left-auto md:right-0 transform translate-x-1/2 md:translate-x-full w-4 h-4 rounded-full bg-primary z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping" />
                </motion.div>

                <Card className="bg-card/90 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 group h-full">
                  {/* Enhanced card header with gradient */}
                  <div className={`h-3 w-full bg-gradient-to-r ${job.bgColor}`}></div>

                  <CardContent className="p-8 relative">
                    {/* Enhanced card background effects */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${job.bgColor} opacity-10`}
                      animate={{
                        opacity: [0.05, 0.1, 0.05],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${job.bgColor} opacity-20 -rotate-45 transform origin-top-right`}></div>
                    </div>

                    {/* Enhanced content with better spacing */}
                    <div className="relative z-10 space-y-6">
                      {/* Job icon with enhanced animation */}
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${job.bgColor} flex items-center justify-center`}
                        whileHover={{
                          scale: 1.1,
                          rotate: 10,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {job.icon}
                      </motion.div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                          {job.title}
                        </h3>
                        <p className="text-primary font-medium">{job.company}</p>
                        <Badge variant="outline" className="bg-primary/5 mt-1">
                          {job.period}
                        </Badge>
                      </div>

                      {/* Enhanced points list with improved styling */}
                      <ul className="space-y-4">
                        {job.points.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                            className="text-muted-foreground flex items-start gap-3 group"
                          >
                            <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                              <span className="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                            </span>
                            <span className="text-sm leading-relaxed">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="w-full py-20 relative bg-background" style={{ scrollMarginTop: '64px' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl">
          {/* Enhanced section title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block mb-4">
                Skills & Expertise
              </h2>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Enhanced card background effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-500/5"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Enhanced section title */}
                  <motion.h3
                    className="text-lg font-semibold mb-4 flex items-center relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <Code2 className="mr-2 h-5 w-5 text-primary" />
                    Technical Skills
                  </motion.h3>

                  {/* Enhanced skills grid */}
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    {[
                      {
                        category: "Languages",
                        skills: ["Python", "JavaScript", "Java", "C++"]
                      },
                      {
                        category: "Frontend",
                        skills: ["React", "TailwindCSS", "HTML/CSS"]
                      },
                      {
                        category: "Backend",
                        skills: ["Node.js", "MongoDB", "MySQL"]
                      },
                      {
                        category: "Tools",
                        skills: ["Git", "VS Code", "Docker"]
                      }
                    ].map((category, index) => (
                      <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h4 className="text-sm font-medium text-primary mb-3 flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2" />
                          {category.category}
                        </h4>
                        <ul className="space-y-2 list-none">
                          {category.skills.map((skill, i) => (
                            <motion.li
                              key={skill}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: 0.2 + (i * 0.1),
                              }}
                              className="text-muted-foreground flex items-center gap-2 group"
                            >
                              <motion.span
                                className="h-1 w-1 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300"
                                whileHover={{ scale: 1.5 }}
                              />
                              {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Specialized Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Enhanced card background effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-500/5"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Enhanced section title */}
                  <motion.h3
                    className="text-lg font-semibold mb-6 flex items-center relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    Specialized Skills
                  </motion.h3>

                  {/* Enhanced skills progress bars */}
                  <div className="space-y-6 relative z-10">
                    {[
                      {
                        skill: "AI Model Training",
                        level: 90,
                        color: "from-blue-600 to-indigo-500"
                      },
                      {
                        skill: "LLM Optimization",
                        level: 85,
                        color: "from-indigo-500 to-purple-400"
                      },
                      {
                        skill: "Competitive Programming",
                        level: 80,
                        color: "from-purple-400 to-pink-300"
                      },
                      {
                        skill: "Full Stack Development",
                        level: 75,
                        color: "from-pink-300 to-red-400"
                      }
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.skill}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{skill.skill}</span>
                          <span className="text-sm text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              animate={{
                                x: ["-100%", "100%"],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Education Section with Improved UI */}
      <section id="education" className="w-full py-20 relative bg-background" style={{ scrollMarginTop: '64px' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl">
          {/* Enhanced section title with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block mb-4">
                Education Journey
              </h2>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Academic foundations that shaped my technical expertise and professional growth
            </motion.p>
          </motion.div>

          {/* Enhanced education cards with improved layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                university: "Qarshi University",
                location: "Lahore",
                period: "Sep 2024 - June 2025",
                degree: "Bachelor of Computer Science",
                icon: "🎓",
                bgColor: "from-violet-600/20 to-indigo-600/20",
                achievements: [
                  "Merit-based fully funded scholarship recipient",
                  "Member of Computer Science Society"
                ],
                courses: [
                  "Artificial Intelligence",
                  "Machine Learning",
                  "Advanced Algorithms",
                  "Software Engineering"
                ]
              },
              {
                university: "Sukkur IBA University",
                location: "Sukkur",
                period: "Aug 2021 - May 2024",
                degree: "Bachelor of Computer Science",
                icon: "🏛️",
                bgColor: "from-blue-600/20 to-cyan-500/20",
                achievements: [
                  "Sindh Government fully funded scholarship",
                  "Programming Competition Winner"
                ],
                courses: [
                  "Data Structures",
                  "Web Development",
                  "Database Systems",
                  "Computer Networks"
                ]
              }
            ].map((edu, index) => (
              <motion.div
                key={edu.university}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                className="flex"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 group h-full w-full overflow-hidden">
                  {/* Enhanced card header with gradient */}
                  <div className={`h-3 w-full bg-gradient-to-r ${edu.bgColor}`}></div>

                  <CardContent className="p-8 relative">
                    {/* Enhanced card background effects */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${edu.bgColor} opacity-10`}
                      animate={{
                        opacity: [0.05, 0.1, 0.05],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${edu.bgColor} opacity-20 -rotate-45 transform origin-top-right`}></div>
                    </div>

                    {/* Enhanced content with better spacing */}
                    <div className="relative z-10 space-y-6">
                      {/* University icon with enhanced animation */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${edu.bgColor} flex items-center justify-center text-2xl`}
                          whileHover={{
                            scale: 1.1,
                            rotate: 10,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <span>{edu.icon}</span>
                        </motion.div>

                        <Badge variant="outline" className="bg-primary/5 px-3 py-1.5 text-sm">
                          {edu.period}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                          {edu.university}
                        </h3>
                        <p className="text-primary font-medium">{edu.location}</p>
                        <p className="text-lg font-semibold">{edu.degree}</p>
                        {edu.gpa && (
                          <p className="text-sm font-medium bg-primary/5 inline-block px-3 py-1 rounded-full">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>

                      {/* Enhanced achievements list with improved styling */}
                      <div className="space-y-2">
                        <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Achievements</h4>
                        <ul className="space-y-3 mt-2">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                              className="text-muted-foreground flex items-start gap-3 group"
                            >
                              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                                <span className="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                              </span>
                              <span className="text-sm leading-relaxed">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Enhanced courses list with improved styling */}
                      <div className="space-y-2">
                        <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Key Courses</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {edu.courses.map((course, i) => (
                            <motion.span
                              key={course}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Added decorative bottom element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mt-16"
          >
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600/30 to-indigo-500/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Social Work & Volunteering Section with Improved UI */}
      <section id="volunteering" className="w-full py-20 relative bg-background" style={{ scrollMarginTop: '64px' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl">
          {/* Enhanced section title with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block mb-4">
                Social Work & Volunteering
              </h2>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Committed to making a positive impact through community service and leadership initiatives
            </motion.p>
          </motion.div>

          {/* Improved card layout with staggered animation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Procurement Lead",
                organization: "Khudkafeel Rozgar Project",
                period: "2023 - Present",
                icon: <Rocket className="h-6 w-6 text-primary" />,
                bgColor: "from-blue-600/20 to-indigo-500/20",
                points: [
                  "Spearheaded sourcing and supply management to empower marginalized communities in Sukkur, Sindh",
                  "Identified reliable vendors and negotiated favorable terms for quality materials",
                  "Managed timely delivery of essential items for community initiatives",
                  "Supported initiatives providing mobile carts and stalls for food item sales"
                ],
                links: [
                  {
                    label: "Facebook",
                    url: "https://www.facebook.com/khudkafeelpakistanofficial",
                    icon: <ExternalLink className="h-4 w-4" />
                  },
                  {
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/company/khudkafeel-rozgar-project/posts/?feedView=all",
                    icon: <Linkedin className="h-4 w-4" />
                  }
                ]
              },
              {
                title: "Young Leaders Conference",
                organization: "YLC",
                period: "Sept 2023",
                icon: <Brain className="h-6 w-6 text-primary" />,
                bgColor: "from-indigo-500/20 to-purple-500/20",
                points: [
                  "Led a social action project supporting small startup businesses for underprivileged individuals",
                  "Secured funding and sponsorships for community-driven initiatives, collaborating with corporate partners and NGOs",
                  "Organized a free education initiative, providing mentorship and skill-building workshops for 15+ students",
                  "Led a tree plantation drive as part of sustainability efforts, promoting environmental awareness"
                ]
              },
              {
                title: "Campus Ambassador",
                organization: "Markhor Youth Impact",
                period: "June 2021 - Oct 2021",
                icon: <Trophy className="h-6 w-6 text-primary" />,
                bgColor: "from-purple-500/20 to-pink-500/20",
                points: [
                  "Selected as a Campus Ambassador, representing and promoting leadership programs within the university",
                  "Joined the program on a fully funded sponsorship, demonstrating excellence in leadership potential",
                  "Engaged in intensive leadership training and networking with industry experts",
                  "Organized campus-level activities to inspire students toward personal and professional growth"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                className="flex"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 group h-full w-full overflow-hidden">
                  {/* Enhanced card header with gradient */}
                  <div className={`h-3 w-full bg-gradient-to-r ${item.bgColor}`}></div>

                  <CardContent className="p-8 relative">
                    {/* Enhanced card background effects */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-10`}
                      animate={{
                        opacity: [0.05, 0.1, 0.05],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${item.bgColor} opacity-20 -rotate-45 transform origin-top-right`}></div>
                    </div>

                    {/* Enhanced content with better spacing */}
                    <div className="relative z-10 space-y-6">
                      {/* Icon with enhanced animation */}
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.bgColor} flex items-center justify-center`}
                        whileHover={{
                          scale: 1.1,
                          rotate: 10,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {item.icon}
                      </motion.div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                          {item.title}
                        </h3>
                        {item.organization && (
                          <p className="text-primary font-medium">{item.organization}</p>
                        )}
                        <Badge variant="outline" className="bg-primary/5 mt-1">
                          {item.period}
                        </Badge>
                      </div>

                      {/* Enhanced points list with improved styling */}
                      <ul className="space-y-4 mt-6">
                        {item.points.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                            className="text-muted-foreground flex items-start gap-3 group"
                          >
                            <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                              <span className="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                            </span>
                            <span className="text-sm leading-relaxed">{point}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Enhanced links section with improved styling */}
                      {item.links && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-primary/10"
                        >
                          {item.links.map((link) => (
                            <motion.a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary/10 rounded-full text-primary text-sm transition-all duration-300"
                              whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {link.icon}
                              <span>{link.label}</span>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Added decorative bottom element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mt-16"
          >
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600/30 to-indigo-500/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="w-full py-20 relative bg-background" style={{ scrollMarginTop: '64px' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full bg-grid-white/5 bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-7xl">
          {/* Enhanced section title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent inline-block mb-4">
                Let's Connect
              </h2>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Feel free to reach out through any of these channels. I'm always open to new opportunities and collaborations.
            </motion.p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Mail className="h-6 w-6" />,
                label: "Email",
                value: "Suresh.manghwar@gmail.com",
                href: "mailto:Suresh.manghwar@gmail.com",
                color: "from-blue-600/20 to-indigo-500/20"
              },
              {
                icon: <Github className="h-6 w-6" />,
                label: "GitHub",
                value: "github.com/Suresh-cs-q",
                href: "https://github.com/Suresh-cs-q",
                color: "from-indigo-500/20 to-purple-500/20"
              },
              {
                icon: <Linkedin className="h-6 w-6" />,
                label: "LinkedIn",
                value: "linkedin.com/in/sureshkumar-cs",
                href: "https://linkedin.com/in/sureshkumar-cs",
                color: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: <Phone className="h-6 w-6" />,
                label: "Phone",
                value: "+92-313-1136263",
                href: "tel:+923131136263",
                color: "from-pink-500/20 to-red-500/20"
              }
            ].map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.label !== "Phone" ? "_blank" : undefined}
                rel={contact.label !== "Phone" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 relative overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      <motion.div
                        className="p-3 rounded-full bg-primary/10 text-primary"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {contact.icon}
                      </motion.div>

                      <div>
                        <h3 className="font-semibold text-lg mb-1">{contact.label}</h3>
                        <p className="text-sm text-muted-foreground break-all">{contact.value}</p>
                      </div>

                      <motion.div
                        className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 