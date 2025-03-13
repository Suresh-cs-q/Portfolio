import * as React from "react"
import { Menu, X, ChevronRight, Github, Linkedin, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"

const NavHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  // Track scroll position to change navbar appearance and update progress
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollPosition / windowHeight) * 100
      setScrollProgress(progress)
      
      // Update active section based on scroll position
      const sections = [
        "home", "projects", "experience", "skills", "education", "volunteering", "contact"
      ]
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop - 80, // Adjust for header height
        behavior: "smooth"
      })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Volunteering", id: "volunteering" },
    { label: "Contact", id: "contact" },
  ]

  // Social media links
  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, url: "https://github.com/Suresh-cs-q", label: "GitHub" },
    { icon: <Linkedin className="h-4 w-4" />, url: "https://linkedin.com/in/sureshkumar-cs", label: "LinkedIn" },
    { icon: <Mail className="h-4 w-4" />, url: "mailto:Suresh.manghwar@gmail.com", label: "Email" }
  ]

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background shadow-lg border-b border-primary/20" 
          : "bg-background/95 shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("home")
              }}
              className="text-xl font-bold"
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-md">
                Suresh Kumar
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-1">
              {navItems.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(id)
                  }}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === id 
                      ? "text-primary bg-primary/10 shadow-sm" 
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {label}
                  
                  {/* Active indicator */}
                  {activeSection === id && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                  )}
                </a>
              ))}
            </div>
            
            {/* Social media icons */}
            <div className="flex items-center ml-4 space-x-2 pl-3 border-l border-primary/20">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 shadow-sm" style={{ width: `${scrollProgress}%` }} />

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Enhanced backdrop with blur effect */}
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Enhanced Menu Panel */}
            <motion.div 
              className="absolute inset-y-0 right-0 w-[min(85%,320px)] bg-background shadow-2xl border-l border-primary/20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                mass: 0.8
              }}
            >
              {/* Enhanced Header */}
              <div className="sticky top-0 z-20 bg-background border-b border-primary/20 px-6 py-4 shadow-md">
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-md"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    Menu
                  </motion.span>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-primary/15 hover:bg-primary/25 text-primary transition-colors duration-200 shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Scrollable Content */}
              <ScrollArea className="h-[calc(100vh-73px)] overflow-y-auto px-6">
                {/* Navigation Links */}
                <nav className="py-6 space-y-2">
                  {navItems.map(({ label, id }, index) => (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === id
                          ? "bg-primary/20 text-primary font-medium shadow-md border border-primary/10" 
                          : "hover:bg-primary/10 text-foreground hover:text-primary border border-transparent hover:border-primary/5"
                      }`}
                    >
                      <span className="text-base">{label}</span>
                      {activeSection === id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="ml-auto flex items-center space-x-2"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </motion.div>
                      )}
                    </motion.a>
                  ))}
                </nav>

                {/* Enhanced Social Links Section */}
                <div className="py-6 border-t border-primary/20">
                  <motion.p 
                    className="text-xs uppercase tracking-wider text-foreground font-semibold mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    Connect With Me
                  </motion.p>
                  <div className="grid grid-cols-1 gap-2">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.4 + index * 0.1,
                          duration: 0.3,
                          type: "spring"
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary transition-colors duration-200 shadow-md border border-primary/10"
                      >
                        <div className="bg-primary/10 p-2 rounded-full">
                          {social.icon}
                        </div>
                        <span className="text-sm font-medium">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <motion.div 
                  className="py-6 text-center text-sm text-foreground border-t border-primary/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <p className="font-medium">© 2024 Suresh Kumar</p>
                  <p className="mt-1 text-primary">Full Stack Developer & AI Specialist</p>
                </motion.div>
              </ScrollArea>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavHeader 