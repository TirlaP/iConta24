"use client";
import { motion } from "framer-motion";
import { BarChart3, Cpu, Headphones, Upload } from "lucide-react";
import React from "react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Încarcă Documentele",
    description: "Încarci online documentele în platforma noastră securizată, disponibilă 24/7.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Procesare Automată",
    description: "Folosim tehnologie avansată pentru procesarea și înregistrarea documentelor.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Analiză în Timp Real",
    description: "Accesezi rapoarte și analize financiare actualizate în timp real.",
  },
  {
    number: "04",
    icon: Headphones,
    title: "Suport Dedicat",
    description: "Beneficiezi de suport specializat și consultanță financiar-contabilă.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Cum funcționează?</h2>
          <p className="text-lead max-w-3xl mx-auto">
            Procesul nostru simplificat îți permite să te concentrezi pe dezvoltarea afacerii
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-300">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="heading-4 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 mb-6">
            Simplu, eficient și transparent - așa ar trebui să fie contabilitatea modernă
          </p>
          <a href="#contact" className="btn-primary">
            Începe Acum
          </a>
        </motion.div>
      </div>
    </section>
  );
};