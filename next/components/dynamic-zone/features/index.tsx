"use client";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, FileText, TrendingUp, Users, Zap } from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  span?: string;
  highlighted_text?: string;
}

interface FeaturesProps {
  heading: string;
  sub_heading: string;
  globe_card?: FeatureCard;
  ray_card?: FeatureCard;
  graph_card?: FeatureCard & { top_items?: Array<{ label: string }> };
  social_media_card?: FeatureCard;
}

const iconMap = {
  "contabilitate": Calculator,
  "declarații": FileText,
  "salarizare": Users,
  "consultanță": TrendingUp,
  "default": Zap
};

const getIconForTitle = (title: string) => {
  const lowerTitle = title?.toLowerCase();
  if (lowerTitle?.includes("contabilitate")) return iconMap.contabilitate;
  if (lowerTitle?.includes("declarații") || lowerTitle?.includes("fiscale")) return iconMap.declarații;
  if (lowerTitle?.includes("salarizare") || lowerTitle?.includes("hr")) return iconMap.salarizare;
  if (lowerTitle?.includes("consultanță")) return iconMap.consultanță;
  return iconMap.default;
};

const FeatureCard = ({ card, index, span = "1" }: { card: FeatureCard; index: number; span?: string }) => {
  const IconComponent = getIconForTitle(card.title);
  const colSpan = span === "two" ? "md:col-span-2" : span === "three" ? "md:col-span-3" : "md:col-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`${colSpan} group relative`}
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-accent mb-3">{card.title}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{card.description}</p>

          {/* Highlighted text */}
          {card.highlighted_text && (
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-primary font-semibold text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              {card.highlighted_text}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Features = ({ heading, sub_heading, globe_card, ray_card, graph_card, social_media_card }: FeaturesProps) => {
  const cards = [globe_card, ray_card, graph_card, social_media_card].filter(Boolean);

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
          <h2 className="heading-2 mb-4">{heading}</h2>
          <p className="text-lead max-w-3xl mx-auto">{sub_heading}</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {globe_card && (
            <FeatureCard 
              card={globe_card} 
              index={0} 
              span={globe_card.span} 
            />
          )}
          {ray_card && (
            <FeatureCard 
              card={ray_card} 
              index={1} 
              span={ray_card.span} 
            />
          )}
          {graph_card && (
            <FeatureCard 
              card={graph_card} 
              index={2} 
              span={graph_card.span} 
            />
          )}
          {social_media_card && social_media_card.title && (
            <FeatureCard 
              card={social_media_card} 
              index={3} 
              span={social_media_card.span} 
            />
          )}
        </div>

        {/* Bottom feature list from graph_card top_items */}
        {graph_card?.top_items && graph_card.top_items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-gradient-to-r from-secondary to-primary-50 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {graph_card.top_items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
