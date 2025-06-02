"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  // Convert RGB arrays to CSS color
  const primaryColor = colors[0] ? `rgb(${colors[0].join(",")})` : "rgb(0,255,255)";
  const secondaryColor = colors[1] ? `rgb(${colors[1].join(",")})` : primaryColor;
  
  return (
    <div className={cn("h-full relative bg-transparent w-full overflow-hidden", containerClassName)}>
      <div className="h-full w-full relative">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)`,
          }}
        />
        
        {/* Animated dots pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${primaryColor} ${dotSize || 1}px, transparent ${dotSize || 1}px)`,
            backgroundSize: "20px 20px",
            animation: `reveal ${2 / animationSpeed}s linear infinite`,
          }}
        />
        
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
        )}
      </div>
      
      <style jsx>{`
        @keyframes reveal {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-20px) translateX(-20px);
          }
        }
      `}</style>
    </div>
  );
};