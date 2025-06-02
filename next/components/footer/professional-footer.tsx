"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { IContaLogo } from "@/components/iconta-logo";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Linkedin,
  ArrowRight,
  Shield,
  Clock,
  Award
} from "lucide-react";

interface FooterProps {
  locale?: string;
}

export const ProfessionalFooter: React.FC<FooterProps> = ({ locale = "ro" }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { text: "Contabilitate Financiară", href: "/servicii#contabilitate" },
      { text: "Declarații Fiscale", href: "/servicii#declaratii" },
      { text: "Salarizare & HR", href: "/servicii#salarizare" },
      { text: "Înființare Firmă", href: "/infiintare-firma" },
    ],
    company: [
      { text: "Despre Noi", href: "/echipa" },
      { text: "Blog", href: "/blog" },
      { text: "Contact", href: "/contact" },
      { text: "Cariere", href: "/cariere" },
    ],
    legal: [
      { text: "GDPR", href: "/gdpr" },
      { text: "Termeni și Condiții", href: "/termeni-si-conditii" },
      { text: "Politica de Confidențialitate", href: "/politica-confidentialitate" },
      { text: "FAQ", href: "/faq" },
    ],
  };

  const features = [
    { icon: Shield, text: "Certificat CECCAR" },
    { icon: Clock, text: "10+ ani experiență" },
    { icon: Award, text: "100% Garanție" },
  ];

  return (
    <footer className="bg-accent text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <IContaLogo variant="light" className="mb-6" />
            
            <p className="text-white/80 mb-6 text-sm leading-relaxed max-w-sm">
              &ldquo;Contabilitatea înseamnă mai mult decât să operezi documente și să raportezi cifrele. 
              Înseamnă să îl ajuți pe antreprenor să ia deciziile în direcția cifrelor pe care și le dorește.&rdquo;
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <feature.icon className="w-4 h-4 text-primary-light mr-2" />
                  <span className="text-white/80">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://facebook.com/iconta24" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/iconta24" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Servicii</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.text}>
                  <Link 
                    href={`/${locale}${link.href}`}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Companie</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.text}>
                  <Link 
                    href={`/${locale}${link.href}`}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:0745823960" 
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  0745 823 960
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@iconta24.com" 
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contact@iconta24.com
                </a>
              </li>
              <li className="text-white/70 text-sm">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Suceava:</strong><br />
                    Str. Gheorghe Doja nr.99<br />
                    <strong className="mt-2 block">București:</strong>
                    Otopeni
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60">
              © {currentYear} iConta24. Toate drepturile rezervate.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.text}>
                  <Link 
                    href={`/${locale}${link.href}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-white/20">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="text-sm text-white/60">
              FACILITY ACCOUNT SRL • CUI 37210737
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};