import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Education", section: "education" },
    { name: "Projects", section: "projects" },
    { name: "Achievements", section: "certifications" },
    { name: "Contact", section: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button on Left */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          {/* Logo (centered in mobile) */}
          <div className="text-2xl font-bold gradient-text flex-1 text-center md:text-left">
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className={`transition-colors duration-300 font-medium hover:scale-105 ${
                  activeSection === item.section
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 shadow-lg transform transition-transform duration-300 md:hidden z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 p-6">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                onNavigate(item.section);
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors duration-300 ${
                activeSection === item.section
                  ? "text-primary"
                  : "text-gray-300 hover:text-primary"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
