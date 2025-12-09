import { Link } from "@remix-run/react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
  href?: string;
  as?: "article" | "div" | "li";
}

export function Card({ className, children, href, as: Component = "div" }: CardProps) {
  const cardStyles = clsx(
    "bg-white rounded-xl shadow-sm border border-surface overflow-hidden",
    "transition-all duration-200",
    href && "hover:shadow-md hover:-translate-y-1",
    className
  );

  if (href) {
    return (
      <Component className={cardStyles}>
        <Link to={href} className="block h-full">
          {children}
        </Link>
      </Component>
    );
  }

  return <Component className={cardStyles}>{children}</Component>;
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | "portrait";
  className?: string;
}

export function CardImage({
  src,
  alt,
  aspectRatio = "video",
  className,
}: CardImageProps) {
  const aspectStyles = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={clsx("overflow-hidden", aspectStyles[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={clsx("p-4 md:p-6", className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({ children, className, as: Component = "h3" }: CardTitleProps) {
  return (
    <Component
      className={clsx(
        "font-serif font-bold text-base md:text-lg text-primary",
        "line-clamp-2 group-hover:text-primary-600 transition-colors",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={clsx("text-sm text-gray-600 mt-2 line-clamp-3", className)}>
      {children}
    </p>
  );
}

interface CardMetaProps {
  children: ReactNode;
  className?: string;
}

export function CardMeta({ children, className }: CardMetaProps) {
  return (
    <div className={clsx("flex items-center gap-2 text-sm text-gray-500 mt-3", className)}>
      {children}
    </div>
  );
}
