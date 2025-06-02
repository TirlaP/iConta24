"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Calculator, FileText, Shield, TrendingUp } from "lucide-react";

interface AccountingHeroProps {
  locale?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const AccountingHero: React.FC<AccountingHeroProps> = ({
  locale = "ro",
  title = "Digitalizează-ți procesul de contabilitate!",
  subtitle = "Soluții moderne pentru afacerea ta",
  description = "Folosind noile tehnologii, oferim o experiență nouă, digitalizată și eficientă în domeniul financiar contabil.",
  primaryButtonText = "HAI SĂ NE CUNOAȘTEM!",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Vezi Serviciile",
  secondaryButtonLink = "/servicii",
}) => {
  const features = [
    "Consultanță contabilitate Gratuită",
    "Birou virtual 24/24",
    "Acces în timp real la cifre",
    "Suport financiar-contabil",
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6"
            >
              <Shield className="w-4 h-4 mr-2" />
              {subtitle}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-1 text-accent mb-6"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lead mb-8"
            >
              {description}
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={`/${locale}${primaryButtonLink}`} className="btn-primary group">
                {primaryButtonText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={`/${locale}${secondaryButtonLink}`} className="btn-secondary">
                {secondaryButtonText}
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-gray-600">Clienți Mulțumiți</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-gray-600">Ani Experiență</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">Garanție</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-accent">Dashboard Financiar</h3>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Venituri</span>
                    <span className="font-bold text-success">+24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cheltuieli</span>
                    <span className="font-bold text-gray-700">-12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profit</span>
                    <span className="font-bold text-primary">+18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-success h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-8 -right-8 bg-white rounded-xl shadow-lg p-4 z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Calculator className="w-8 h-8 text-primary mb-2" />
                <div className="text-sm font-semibold">Calcule Automate</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-lg p-4 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <FileText className="w-8 h-8 text-primary mb-2" />
                <div className="text-sm font-semibold">Documente Online</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};