import React from 'react';
import Image from 'next/image';
import { strapiImage } from '@/lib/strapi/strapiImage';

interface IContaLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  logo?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
}

export const IContaLogo: React.FC<IContaLogoProps> = ({ 
  className = "", 
  variant = 'dark',
  logo = null
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-accent';
  const accentColor = variant === 'light' ? 'text-white' : 'text-primary';
  
  // If logo from Strapi is provided, use it
  if (logo?.url) {
    return (
      <div className={`flex items-center ${className}`}>
        <Image
          src={strapiImage(logo.url)}
          alt={logo.alternativeText || 'iConta24 Logo'}
          width={logo.width || 160}
          height={logo.height || 40}
          className="h-10 w-auto"
        />
      </div>
    );
  }
  
  // Fallback to the custom text logo
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-xl ${variant === 'light' ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-primary to-primary-dark'} flex items-center justify-center mr-3 shadow-lg`}>
          <span className={`text-xl font-black ${variant === 'light' ? 'text-white' : 'text-white'}`}>i</span>
        </div>
        <div className="flex items-baseline">
          <span className={`text-2xl font-bold ${textColor}`}>Conta</span>
          <span className={`text-2xl font-black ${accentColor}`}>24</span>
        </div>
      </div>
    </div>
  );
};