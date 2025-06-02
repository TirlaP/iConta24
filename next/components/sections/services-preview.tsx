"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle,
  FileText,
  Receipt,
  TrendingUp,
  Users
} from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

const services = [
  {
    icon: Calculator,
    title: "Contabilitate Financiară",
    description: "Servicii complete de contabilitate: jurnal TVA, balanță, registre contabile, bilanț",
    features: ["Jurnal TVA", "Balanță lunară", "Registre contabile", "Bilanț anual"],
    color: "from-primary to-primary-dark",
  },
  {
    icon: FileText,
    title: "Declarații Fiscale",
    description: "Realizarea și depunerea lunară a declarațiilor pentru taxe și impozite",
    features: ["Declarații lunare", "Depunere automată", "Monitorizare termene", "Consultanță fiscală"],
    color: "from-accent to-accent-dark",
  },
  {
    icon: Users,
    title: "Salarizare & HR",
    description: "Servicii complete de salarizare și gestiune documente HR",
    features: ["State de plată", "Revisal", "Contracte de muncă", "Pontaje"],
    color: "from-success to-green-600",
  },
];

export const ServicesPreview: React.FC = () => {
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
          <h2 className="heading-2 mb-4">Servicii de Contabilitate</h2>
          <p className="text-lead max-w-3xl mx-auto">
            Îți stăm la dispoziție cu o gamă completă de servicii, ce pot fi adaptate nevoilor tale
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="card card-bordered h-full overflow-hidden">
                {/* Gradient Header */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${service.color}`}></div>

                {/* Icon */}
                <div className="flex items-center justify-between mb-6 mt-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                {/* Content */}
                <h3 className="heading-4 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-secondary to-primary-50 rounded-2xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-3 mb-4">Servicii Suplimentare</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Înființare firmă</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Receipt className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Obținere cod TVA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Depunere bilanț</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Consultanță fiscală</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-gray-600 mb-4">
                Descoperă toate serviciile noastre și alege pachetul potrivit pentru afacerea ta
              </p>
              <Link href="/ro/servicii" className="btn-primary inline-flex items-center">
                Vezi Toate Serviciile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};