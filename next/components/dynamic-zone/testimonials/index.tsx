"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  company?: string;
  rating?: number;
  text: string;
  image?: any;
}

interface TestimonialsProps {
  heading: string;
  sub_heading: string;
  testimonials: Testimonial[];
}

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const rating = testimonial.rating || 5;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full relative">
        {/* Quote Icon */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <Quote className="w-6 h-6 text-white" />
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4 pt-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-warning fill-warning" />
          ))}
        </div>

        {/* Text */}
        <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>

        {/* Author */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold mr-4">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold text-accent">{testimonial.name}</div>
            {testimonial.company && (
              <div className="text-sm text-gray-600">{testimonial.company}</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials = ({ heading, sub_heading, testimonials }: TestimonialsProps) => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

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

        {/* Testimonials Grid */}
        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        )}

        {/* Fallback message if no testimonials */}
        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-6 py-3 bg-secondary rounded-full">
              <Star className="w-5 h-5 text-primary mr-2" />
              <span className="text-accent font-semibold">Testimonialele vor fi afișate în curând</span>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a 
            href="/ro/contact" 
            className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Devino și tu un client mulțumit
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
