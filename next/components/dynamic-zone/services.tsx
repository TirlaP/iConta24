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
  Users,
  Briefcase,
  ShieldCheck,
  Rocket,
  Settings
} from "lucide-react";
import { Link } from "next-view-transitions";

interface ServiceFeature {
  label: string;
  description?: string;
  included: boolean;
}

interface Service {
  title: string;
  description: string;
  icon: string;
  features?: ServiceFeature[];
  price?: string;
  highlighted: boolean;
}

interface ServicesProps {
  heading: string;
  sub_heading: string;
  services?: Service[];
}

const iconMap = {
  calculator: Calculator,
  "file-text": FileText,
  users: Users,
  briefcase: Briefcase,
  "chart-line": TrendingUp,
  "shield-check": ShieldCheck,
  rocket: Rocket,
  cog: Settings,
};

const colorMap = {
  calculator: "from-primary to-primary-dark",
  "file-text": "from-accent to-accent-dark", 
  users: "from-success to-green-600",
  briefcase: "from-primary to-primary-dark",
  "chart-line": "from-purple-500 to-purple-700",
  "shield-check": "from-blue-500 to-blue-700",
  rocket: "from-orange-500 to-orange-700",
  cog: "from-gray-500 to-gray-700",
};

const getIconForService = (iconKey: string) => {
  return iconMap[iconKey as keyof typeof iconMap] || Briefcase;
};

const getColorForService = (iconKey: string) => {
  return colorMap[iconKey as keyof typeof colorMap] || "from-primary to-primary-dark";
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const IconComponent = getIconForService(service.icon);
  const colorClass = getColorForService(service.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 h-full overflow-hidden ${service.highlighted ? 'ring-2 ring-primary' : ''}`}>
        {service.highlighted && (
          <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full border border-primary/20 font-medium">
            Popular
          </div>
        )}

        {/* Gradient Header */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${colorClass}`}></div>

        {/* Icon */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-accent mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

        {/* Price */}
        {service.price && (
          <div className="text-center mb-6">
            <span className="text-2xl font-bold text-primary">{service.price}</span>
            <span className="text-gray-500 text-sm ml-1">/lună</span>
          </div>
        )}

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mt-auto">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                {feature.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export const Services = ({ heading, sub_heading, services = [] }: ServicesProps) => {
  // Additional services data (could also come from Strapi in the future)
  const additionalServices = [
    { icon: Building2, label: "Înființare firmă" },
    { icon: Receipt, label: "Obținere cod TVA" },
    { icon: FileText, label: "Depunere bilanț" },
    { icon: TrendingUp, label: "Consultanță fiscală" },
  ];

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
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
            <Briefcase className="w-4 h-4 mr-2" />
            Servicii
          </div>
          <h2 className="heading-2 mb-4">{heading}</h2>
          <p className="text-lead max-w-3xl mx-auto">{sub_heading}</p>
        </motion.div>

        {/* Services Grid */}
        {services.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        )}

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
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <service.icon className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-gray-600 mb-4">
                Descoperă toate serviciile noastre și alege pachetul potrivit pentru afacerea ta
              </p>
              <Link href="/ro/contact" className="btn-primary inline-flex items-center">
                Contactează-ne
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Empty state */}
        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-6 py-3 bg-secondary rounded-full">
              <Briefcase className="w-5 h-5 text-primary mr-2" />
              <span className="text-accent font-semibold">Serviciile vor fi afișate în curând</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};