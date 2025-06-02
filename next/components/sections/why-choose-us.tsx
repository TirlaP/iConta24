"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, Users, Brain, Award } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Simple",
    description: "Încarci online documentele, noi le procesăm și le transformăm în cifre. Eviți pierderea de timp cu drumurile la cabinetul de contabilitate.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Smart",
    description: "Folosim ultima tehnologie pentru serviciile de contabilitate, care asigură mai multă flexibilitate și eficiență.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Users,
    title: "Support",
    description: "Vei avea un contabil alocat companiei tale care îți va oferi suport. Ai acces, în timp real, la situația financiar-contabilă.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Safe",
    description: "Suntem certificați CECCAR. Tehnologiile folosite respectă standarde de siguranță IT. Experiență de 10 ani în domeniu.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">De ce să colaborezi cu iConta24</h2>
          <p className="text-lead max-w-3xl mx-auto">
            Ne adresăm firmelor care preferă ca serviciile de contabilitate să fie:
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="card card-bordered card-hover h-full">
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="heading-4 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-secondary rounded-full">
            <Award className="w-5 h-5 text-primary mr-2" />
            <span className="text-accent font-semibold">Garantăm serviciile noastre 100%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};