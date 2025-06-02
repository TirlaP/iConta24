import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { AccountingHomepage } from '@/components/pages/accounting-homepage';
import { CTASection } from '@/components/sections/cta-section';
import { StrapiHero } from '@/components/sections/strapi-hero';

export default function PageContent({ pageData }: { pageData: any }) {
  const locale = pageData?.locale || 'ro';
  const slug = pageData?.slug || '';
  const dynamicZone = pageData?.dynamic_zone;

  console.log('dynamicZone', dynamicZone)
  
  // If we have dynamic zone data from Strapi, use it to build the page
  if (dynamicZone && dynamicZone.length > 0) {
    return (
      <main className="min-h-screen">
        {dynamicZone.map((component: any, index: number) => {
          switch (component.__component) {
            case 'dynamic-zone.hero':
              return (
                <StrapiHero 
                  key={index}
                  locale={locale}
                  data={{
                    heading: component.heading,
                    subHeading: component.subHeading,
                    description: component.description,
                    buttons: component.buttons
                  }}
                />
              );
              
            case 'dynamic-zone.features':
            case 'dynamic-zone.how-it-works':
            case 'dynamic-zone.testimonials':
            case 'dynamic-zone.team':
            case 'dynamic-zone.services':
            case 'dynamic-zone.cta':
            case 'dynamic-zone.faq':
              // Use DynamicZoneManager for all dynamic components
              return (
                <div key={index}>
                  <DynamicZoneManager 
                    dynamicZone={[component]} 
                    locale={locale} 
                  />
                </div>
              );
              
            default:
              // For unknown components, fall back to the original dynamic zone manager
              return (
                <div key={index}>
                  <DynamicZoneManager 
                    dynamicZone={[component]} 
                    locale={locale} 
                  />
                </div>
              );
          }
        })}
        
        {/* Always add CTA at the end for accounting pages */}
        <CTASection />
      </main>
    );
  }
  
  // Fallback to static accounting homepage if no dynamic zone data
  return <AccountingHomepage locale={locale} />;
}