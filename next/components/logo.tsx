import React from "react";

import { Link } from "next-view-transitions";
import { BlurImage } from "./blur-image";
import { IContaLogo } from "./iconta-logo";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { Image } from "@/types/types";

export const Logo = ({ image, locale, variant = 'dark' }: { image?: Image, locale?: string, variant?: 'light' | 'dark' }) => {
  return (
    <Link
      href={`/${locale || 'ro'}`}
      className="font-normal flex space-x-2 items-center text-sm mr-4 relative z-20"
    >
      <IContaLogo variant={variant} logo={image} />
    </Link>
  );
  
  // Original code for reference (can be used later if needed)
  /*
  if (image) {
    return (
      <Link
        href={`/${locale || 'ro'}`}
        className="font-normal flex space-x-2 items-center text-sm mr-4 relative z-20"
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="h-10 w-10 rounded-xl mr-2"
        />

        <span className="text-white font-bold">iConta24</span>
      </Link>
    );
  }

  return <IContaLogo variant={variant} />;
  */
};
