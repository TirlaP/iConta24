"use client";

import StarBackground from "@/components/decorations/star-background";
import ShootingStars from "@/components/decorations/shooting-star";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
} from "@tabler/icons-react";

import { Button } from "../elements/button";
import { useState } from "react";

export function FormNextToSection({ heading, sub_heading, form, section, social_media_icon_links }: { heading: string, sub_heading: string, form: any, section: any, social_media_icon_links: any }) {

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const socials = [
    {
      title: "facebook",
      href: social_media_icon_links?.[0]?.URL || "https://facebook.com/iconta24",
      icon: (
        <IconBrandFacebook className="h-5 w-5 text-muted hover:text-blue-500 transition-colors" />
      ),
    },
    {
      title: "linkedin",
      href: social_media_icon_links?.[1]?.URL || "https://linkedin.com/company/iconta24",
      icon: (
        <IconBrandLinkedin className="h-5 w-5 text-muted hover:text-blue-600 transition-colors" />
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden bg-gray-50">
      <div className="flex relative z-20 items-center w-full justify-center px-4 py-12 lg:py-24 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
              {heading || "Formular"}
            </h1>
            <p className="mt-4 text-gray-600 text-base">
              {sub_heading}
            </p>
          </div>

          <div className="py-8">
            <form className="space-y-6">
              {form && form?.inputs?.map((input: any, index: number) => (
                <div key={index}>
                  {input.type !== 'submit' && (
                    <label
                      htmlFor={input.name}
                      className="block text-sm font-medium leading-6 text-gray-700 mb-2"
                    >
                      {input.label || input.name}
                    </label>
                  )}

                  {input.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      id={input.name}
                      name={input.name}
                      placeholder={input.placeholder}
                      required={input.required}
                      className="block w-full bg-white px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                    />
                  ) : input.type === 'submit' ? (
                    <div className="pt-4">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                        disabled={form?.terms_checkbox && !agreedToTerms}
                      >
                        {input.name || form?.button?.text || "Trimite"}
                      </Button>
                    </div>
                  ) : (
                    <input
                      id={input.name}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      required={input.required}
                      className="block w-full bg-white px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                    />
                  )}
                </div>
              ))}

              {form?.terms_checkbox && (
                <div className="flex items-start space-x-3 pt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    {form.terms_checkbox.label && (
                      <span className="font-medium">{form.terms_checkbox.label}. </span>
                    )}
                    {form.terms_checkbox.description}
                  </label>
                </div>
              )}

              {form?.button && (
                <div className="pt-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={form?.terms_checkbox && !agreedToTerms}
                  >
                    {form.button.text}
                  </Button>
                </div>
              )}
            </form>
          </div>
          
          {socials.length > 0 && (
            <div className="flex items-center justify-center space-x-4 py-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">Urmărește-ne:</span>
              {socials.map((social) => (
                <Link href={social.href} target="_blank" key={social.title}>
                  {social.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="relative w-full z-20 hidden lg:flex bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10" />
        <StarBackground />
        <ShootingStars />
        <div className="max-w-md mx-auto relative z-10">
          {section?.users && (
            <div className="flex flex-row items-center justify-center mb-10 w-full">
              <AnimatedTooltip items={section.users} />
            </div>
          )}
          
          {section?.heading && (
            <h2 className="font-bold text-2xl text-gray-900 text-center mb-4">
              {section.heading}
            </h2>
          )}
          
          {section?.sub_heading && (
            <p className="font-normal text-base text-center text-gray-700 mb-6">
              {section.sub_heading}
            </p>
          )}
          
          {section?.description && (
            <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg">
              <p className="text-gray-700 whitespace-pre-line">
                {section.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
