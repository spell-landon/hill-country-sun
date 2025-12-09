"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Mail, Phone } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check for touch capability and screen width
      const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouchScreen && isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

interface CopyEmailProps {
  email: string;
  className?: string;
  showIcon?: boolean;
}

export function CopyEmail({ email, className = "", showIcon = true }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // On mobile, use mailto: link
  if (isMobile) {
    return (
      <a
        href={`mailto:${email}`}
        className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
      >
        {showIcon && <Mail className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />}
        <span>{email}</span>
      </a>
    );
  }

  // On desktop, copy to clipboard
  return (
    <button
      onClick={copyToClipboard}
      className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
      title={copied ? "Copied!" : `Copy ${email}`}
    >
      {showIcon && (
        copied ? (
          <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        )
      )}
      <span className={copied ? "text-green-600" : ""}>
        {copied ? "Copied!" : email}
      </span>
    </button>
  );
}

interface CopyPhoneProps {
  phone: string;
  className?: string;
  showIcon?: boolean;
}

export function CopyPhone({ phone, className = "", showIcon = true }: CopyPhoneProps) {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  // Format phone for tel: link (remove non-digits except leading +)
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = phone;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // On mobile, use tel: link
  if (isMobile) {
    return (
      <a
        href={telHref}
        className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
      >
        {showIcon && <Phone className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />}
        <span>{phone}</span>
      </a>
    );
  }

  // On desktop, copy to clipboard
  return (
    <button
      onClick={copyToClipboard}
      className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
      title={copied ? "Copied!" : `Copy ${phone}`}
    >
      {showIcon && (
        copied ? (
          <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        )
      )}
      <span className={copied ? "text-green-600" : ""}>
        {copied ? "Copied!" : phone}
      </span>
    </button>
  );
}
