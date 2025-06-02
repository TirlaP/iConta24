import { cn } from "@/lib/utils";
import React from "react";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-xl font-bold text-accent py-2 group-hover:text-primary transition-colors", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn("text-gray-600 leading-relaxed", className)}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-48 rounded-xl z-40 mb-4",
        className,
        showGradient && "bg-gradient-to-br from-primary/5 to-primary/10"
      )}
    >
      {children}
    </div>
  );
};