"use client";
import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  text: string;
  URL: string;
  target?: string;
  children?: NavItem[];
}

interface NavbarProps {
  leftNavbarItems: NavItem[];
  rightNavbarItems: NavItem[];
  logo: any;
  locale: string;
}

export const ProfessionalNavbar = ({ leftNavbarItems, rightNavbarItems, logo, locale }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { text: "Acasă", URL: "/" },
    { text: "Servicii", URL: "/servicii" },
    { text: "Înființare Firmă", URL: "/infiintare-firma" },
    { text: "Echipa", URL: "/echipa" },
    { text: "Blog", URL: "/blog" },
    { text: "Contact", URL: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-secondary border-b border-gray-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-6 text-sm">
              <a href="tel:0745823960" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>0745 823 960</span>
              </a>
              <a href="mailto:contact@iconta24.com" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@iconta24.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/${locale}/contul-meu`} className="text-sm text-gray-600 hover:text-primary transition-colors">
                Contul Meu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-lg" 
          : "bg-white/95 backdrop-blur-md"
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Logo locale={locale} image={logo} variant="dark" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.text}
                  href={`/${locale}${item.URL}`}
                  className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
                >
                  {item.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href={`/${locale}/servicii#oferta`}
                className="btn-primary"
              >
                Solicită Ofertă
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="container-custom py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.text}
                      href={`/${locale}${item.URL}`}
                      className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      href={`/${locale}/servicii#oferta`}
                      className="btn-primary w-full text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Solicită Ofertă
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-2 text-sm">
                    <a href="tel:0745823960" className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>0745 823 960</span>
                    </a>
                    <a href="mailto:contact@iconta24.com" className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>contact@iconta24.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};