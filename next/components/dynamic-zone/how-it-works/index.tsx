"use client";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle, Cpu, Headphones, Settings, Upload } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  heading: string;
  sub_heading: string;
  steps: Step[];
}

const iconMap = {
  "încarcă": Upload,
  "upload": Upload,
  "procesare": Cpu,
  "automată": Cpu,
  "analiză": BarChart3,
  "raport": BarChart3,
  "suport": Headphones,
  "consultanță": Headphones,
  "default": Settings
};

const getIconForStep = (title: string, index: number) => {
  const lowerTitle = title?.toLowerCase();
  
  if (lowerTitle?.includes("încarcă") || lowerTitle?.includes("upload") || lowerTitle?.includes("document")) return iconMap.încarcă;
  if (lowerTitle?.includes("procesare") || lowerTitle?.includes("automată") || lowerTitle?.includes("procesează")) return iconMap.procesare;
  if (lowerTitle?.includes("analiză") || lowerTitle?.includes("raport") || lowerTitle?.includes("timp real")) return iconMap.analiză;
  if (lowerTitle?.includes("suport") || lowerTitle?.includes("consultanță") || lowerTitle?.includes("dedicat")) return iconMap.suport;
  
  // Fallback based on index
  const fallbackIcons = [Upload, Cpu, BarChart3, Headphones];
  return fallbackIcons[index % fallbackIcons.length] || iconMap.default;
};

export const HowItWorks = ({ heading, sub_heading, steps }: HowItWorksProps) => {
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
          <h2 className="heading-2 mb-4">{heading}</h2>
          <p className="text-lead max-w-3xl mx-auto">{sub_heading}</p>
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
            {steps.map((step, index) => {
              const IconComponent = getIconForStep(step.title, index);
              
              return (
                <motion.div
                  key={index}
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
                        <IconComponent className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="heading-4 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
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
          <div className="inline-flex items-center px-6 py-3 bg-secondary rounded-full mb-6">
            <CheckCircle className="w-5 h-5 text-primary mr-2" />
            <span className="text-accent font-semibold">Simplu, eficient și transparent</span>
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Așa ar trebui să fie contabilitatea modernă
          </p>
        </motion.div>
      </div>
    </section>
  );
};