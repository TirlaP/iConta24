import { ProfessionalFooter } from "@/components/footer/professional-footer";

export const Footer = async ({ data, locale }: { data: any, locale: string }) => {
  // Use the new professional footer for the accounting website
  return <ProfessionalFooter locale={locale} />;
  
  // Original footer code (kept for reference):
  // return (
  //   <div className="relative">
  //     <div className="border-t border-neutral-900 px-8 pt-20 pb-32 relative bg-primary">
  //       ...
  //     </div>
  //   </div>
  // );
};