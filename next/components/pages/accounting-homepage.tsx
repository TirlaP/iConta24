import React from "react";
import { AccountingHero } from "@/components/sections/accounting-hero";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";

interface AccountingHomepageProps {
  locale?: string;
}

export const AccountingHomepage: React.FC<AccountingHomepageProps> = ({ locale = "ro" }) => {
  return (
    <main className="min-h-screen">
      <AccountingHero locale={locale} />
      <WhyChooseUs />
      <HowItWorks />
      <ServicesPreview />
      <Testimonials />
      <CTASection />
    </main>
  );
};