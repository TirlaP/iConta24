import { cn } from "@/lib/utils";
import React from "react";

export const FeatureIconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg mx-auto relative">
      <div
        className={cn(
          "flex items-center justify-center w-full h-full text-white",
          className
        )}
      >
        {children}
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-primary/20 rounded-full blur-sm"></div>
    </div>
  );
};