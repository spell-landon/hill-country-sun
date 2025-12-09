import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-6 sm:mb-8 md:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary relative inline-block">
        {title}
        <span
          className={clsx(
            "absolute -bottom-2 h-1 bg-secondary rounded-full",
            align === "center" ? "left-1/2 -translate-x-1/2 w-12 sm:w-16" : "left-0 w-12 sm:w-16"
          )}
          aria-hidden="true"
        />
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
