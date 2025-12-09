import { Link } from "@remix-run/react";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { Container } from "~/components/ui/Container";

const footerLinks = {
  explore: [
    { label: "Magazine", href: "/magazine" },
    { label: "Articles", href: "/articles" },
    { label: "Calendar", href: "/calendar" },
  ],
  guides: [
    { label: "Welcome to Wimberley", href: "/welcome-to-wimberley" },
    { label: "River Region Guide", href: "/river-region-guide" },
    { label: "Hunting Guide", href: "/hunting-guide" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Advertise", href: "/contact?subject=advertising" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      {/* Main Footer Content */}
      <Container size="wide" className="py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-serif font-bold text-xl sm:text-2xl mb-4"
            >
              <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
              Hill Country Sun
            </Link>
            <p className="text-primary-200 text-sm mb-6">
              Your trusted source for local news, events, and stories from
              Wimberley and the Texas Hill Country region since 1990.
            </p>
            <address className="not-italic space-y-2 text-sm">
              <div className="flex items-start gap-2 text-primary-200">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Wimberley, Texas</span>
              </div>
              <a
                href="mailto:info@hillcountrysun.com"
                className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">info@hillcountrysun.com</span>
              </a>
              <a
                href="tel:+15125551234"
                className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>(512) 555-1234</span>
              </a>
            </address>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-3 sm:mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides Links */}
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-3 sm:mb-4">
              Guides
            </h3>
            <ul className="space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary-400 hover:bg-secondary text-white rounded-lg transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary-400 hover:bg-secondary text-white rounded-lg transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-primary-400">
        <Container size="wide" className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-primary-300">
            <p>© {currentYear} Hill Country Sun. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
