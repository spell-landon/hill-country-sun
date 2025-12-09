import { Link } from "@remix-run/react";
import { clsx } from "clsx";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  to?: never;
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  to: string;
  href?: never;
  type?: never;
  disabled?: never;
}

interface ButtonAsAnchor extends ButtonBaseProps {
  href: string;
  to?: never;
  type?: never;
  disabled?: never;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-600 focus-visible:ring-primary active:bg-primary-700",
  secondary:
    "bg-secondary text-primary hover:bg-secondary-400 focus-visible:ring-secondary active:bg-secondary-600",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus-visible:ring-primary",
  ghost: "text-primary hover:bg-surface focus-visible:ring-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-body-sm",
  md: "px-6 py-3 text-body-md",
  lg: "px-8 py-4 text-body-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = clsx(
    "inline-flex items-center justify-center font-sans font-semibold",
    "transition-all duration-200 rounded-lg",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // Internal link (Remix Link)
  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={baseStyles}>
        {children}
      </Link>
    );
  }

  // External link (anchor)
  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={baseStyles}
        target={props.target}
        rel={props.rel}
      >
        {children}
      </a>
    );
  }

  // Button
  return (
    <button className={baseStyles} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
