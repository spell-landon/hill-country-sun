import { clsx } from "clsx";
import type { ReactNode } from "react";

type ContainerSize = "narrow" | "default" | "wide" | "full";

interface ContainerProps {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const sizeStyles: Record<ContainerSize, string> = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-8xl",
};

export function Container({
  size = "default",
  className,
  children,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
