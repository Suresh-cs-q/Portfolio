import * as React from "react"
import { Menu, X, ChevronRight, Github, Linkedin, Mail } from "lucide-react"

const NavHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const headerRef = React.useRef(null)
  const menuButtonRef = React.useRef(null)

  // Track scroll position to update progress and active section
  React.useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
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

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Handle clicks outside to close menu
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen && 
        !event.target.closest('.mobile-menu') && 
        !menuButtonRef.current?.contains(event.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 64
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop - headerHeight,
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
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-background shadow-md border-b border-primary/10"
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
          <button
            ref={menuButtonRef}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/50 text-white hover:bg-primary/60 transition-all duration-300 shadow-md border border-primary/20 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 shadow-sm" style={{ width: `${scrollProgress}%` }} />

      {/* Mobile Navigation - Always in DOM but conditionally visible */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 mobile-menu ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute inset-y-0 right-0 w-[280px] bg-background shadow-xl border-l border-primary/20 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary/20 bg-background">
            <span className="text-lg font-bold text-primary">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full bg-primary/20 text-primary"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <nav className="p-6 space-y-2">
              {navItems.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    activeSection === id
                      ? "bg-primary/20 text-primary font-medium shadow-sm border border-primary/10" 
                      : "hover:bg-primary/10 text-foreground hover:text-primary"
                  }`}
                >
                  <span className="text-base">{label}</span>
                  {activeSection === id && (
                    <div className="ml-auto flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="px-6 py-6 border-t border-primary/20">
              <p className="text-xs uppercase tracking-wider text-foreground font-semibold mb-4">
                Connect With Me
              </p>
              <div className="grid grid-cols-1 gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary transition-colors"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-6 text-center text-sm border-t border-primary/20">
              <p className="font-medium">© 2025 Suresh Kumar</p>
              <p className="mt-1 text-primary">Full Stack Developer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavHeader 