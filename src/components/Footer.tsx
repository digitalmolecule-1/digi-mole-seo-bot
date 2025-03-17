
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/0273d6e2-d521-4b36-962c-a8d184633a11.png"
                alt="Digital Molecule" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl text-digimole-black dark:text-white">
                Digital Molecule
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Advanced SEO analysis powered by AI to help you optimize your website 
              and improve your search engine rankings.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon href="#" icon={<Globe size={18} />} label="Website" />
              <SocialIcon href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialIcon href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialIcon href="#" icon={<Github size={18} />} label="GitHub" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/analysis">SEO Analysis</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            © {currentYear} Digital Molecule. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon = ({ href, icon, label }: SocialIconProps) => (
  <a 
    href={href}
    aria-label={label}
    className="h-10 w-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gradient-purple-blue hover:text-white transition-all"
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link 
      to={href} 
      className="text-gray-600 dark:text-gray-400 hover:text-digimole-purple dark:hover:text-digimole-blue transition-colors"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
