"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { ArrowRight, Phone, Mail, CheckCircle } from "lucide-react";

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-dark to-primary-900"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Animated Elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Garanție 100%
            </div>

            {/* Heading */}
            <h2 className="heading-2 text-white mb-6">
              Pregătit să îți simplifici contabilitatea?
            </h2>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Alătură-te celor peste 100 de companii care au ales serviciile noastre moderne de contabilitate
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center text-white/80">
                <CheckCircle className="w-5 h-5 mr-2 text-primary-light" />
                <span>Consultanță gratuită</span>
              </div>
              <div className="flex items-center text-white/80">
                <CheckCircle className="w-5 h-5 mr-2 text-primary-light" />
                <span>Setup rapid</span>
              </div>
              <div className="flex items-center text-white/80">
                <CheckCircle className="w-5 h-5 mr-2 text-primary-light" />
                <span>Fără costuri ascunse</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/ro/contact" 
                className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center group"
              >
                Contactează-ne Acum
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:0745823960" 
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                0745 823 960
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
              <a href="mailto:contact@iconta24.com" className="flex items-center hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                contact@iconta24.com
              </a>
              <span className="hidden sm:block">•</span>
              <span>Luni - Vineri: 9:00 - 18:00</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};