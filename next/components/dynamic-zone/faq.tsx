"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading: string;
  sub_heading: string;
  faqs: FAQItem[];
}

const FAQAccordion = ({ faq, index }: { faq: FAQItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
      >
        <h3 className="font-semibold text-accent group-hover:text-primary transition-colors">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="px-6 py-4">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = ({ heading, sub_heading, faqs }: FAQProps) => {
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
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </div>
          <h2 className="heading-2 mb-4">{heading}</h2>
          <p className="text-lead max-w-3xl mx-auto">{sub_heading}</p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs && faqs.map((faq, index) => (
            <FAQAccordion key={faq.question} faq={faq} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-secondary to-primary-50 rounded-2xl p-8">
            <h3 className="heading-3 mb-4">Nu găsești răspunsul pe care îl cauți?</h3>
            <p className="text-gray-600 mb-6">
              Echipa noastră de experți este gata să îți răspundă la orice întrebare
            </p>
            <a 
              href="/ro/contact" 
              className="btn-primary inline-flex items-center"
            >
              Contactează-ne
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
