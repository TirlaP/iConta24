"use client";
import { ProfessionalNavbar } from "./professional-navbar";

export function Navbar({ data, locale }: { data: any, locale: string }) {
  return (
    <ProfessionalNavbar 
      locale={locale} 
      leftNavbarItems={data?.left_navbar_items || []} 
      rightNavbarItems={data?.right_navbar_items || []} 
      logo={data?.logo} 
    />
  );
}