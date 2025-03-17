
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Search, Home, BarChart, MessageSquare } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled 
          ? "bg-white/80 dark:bg-digimole-black/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="Digital Molecule Home"
        >
          <img 
            src="/lovable-uploads/0273d6e2-d521-4b36-962c-a8d184633a11.png" 
            alt="Digital Molecule" 
            className="h-8 md:h-10 w-auto"
          />
          <span className={cn(
            "font-bold text-xl hidden md:block transition-colors",
            isScrolled ? "text-digimole-black dark:text-white" : "text-digimole-black dark:text-white"
          )}>
            Digital Molecule
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/" isActive={location.pathname === "/"} icon={<Home size={18} />}>
            Home
          </NavLink>
          <NavLink href="/analysis" isActive={location.pathname.includes("/analysis")} icon={<BarChart size={18} />}>
            SEO Analysis
          </NavLink>
          <NavLink 
            href={location.pathname.includes("/analysis") ? "#chatbot" : "/analysis"} 
            isActive={false} 
            icon={<MessageSquare size={18} />}
          >
            AI Chat
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-digimole-black dark:text-white" />
          ) : (
            <Menu size={24} className="text-digimole-black dark:text-white" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-digimole-black z-40 animate-fade-in">
            <nav className="flex flex-col p-6 gap-4">
              <MobileNavLink href="/" isActive={location.pathname === "/"} icon={<Home size={20} />}>
                Home
              </MobileNavLink>
              <MobileNavLink 
                href="/analysis" 
                isActive={location.pathname.includes("/analysis")} 
                icon={<BarChart size={20} />}
              >
                SEO Analysis
              </MobileNavLink>
              <MobileNavLink 
                href={location.pathname.includes("/analysis") ? "#chatbot" : "/analysis"} 
                isActive={false} 
                icon={<MessageSquare size={20} />}
              >
                AI Chat
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  icon?: React.ReactNode;
}

const NavLink = ({ href, children, isActive, icon }: NavLinkProps) => (
  <Link
    to={href}
    className={cn(
      "relative flex items-center gap-1.5 font-medium transition-colors px-2 py-1 rounded-md",
      isActive 
        ? "text-digimole-purple dark:text-digimole-blue" 
        : "text-gray-700 dark:text-gray-300 hover:text-digimole-purple dark:hover:text-digimole-blue"
    )}
  >
    {icon}
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-purple-blue rounded-full" />
    )}
  </Link>
);

const MobileNavLink = ({ href, children, isActive, icon }: NavLinkProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 py-3 px-4 rounded-lg transition-colors",
      isActive 
        ? "bg-gradient-purple-blue text-white" 
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    {icon}
    <span className="font-medium text-lg">{children}</span>
  </Link>
);

export default NavBar;
