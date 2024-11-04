import React from "react";
import module from "./Section.module.scss";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return <div className={`${module.container} ${className}`}>{children}</div>;
}
