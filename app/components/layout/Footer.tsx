import { Link } from "@remix-run/react";
import { MapPin, Facebook, Instagram } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { CopyEmail, CopyPhone } from "~/components/ui/CopyEmail";

const footerLinks = {
  explore: [
    { label: "Hill Country Sun", href: "/publications/hill-country-sun" },
    { label: "Articles", href: "/articles" },
    { label: "Calendar", href: "/calendar" },
  ],
  publications: [
    { label: "Welcome to Wimberley", href: "/publications/welcome-to-wimberley" },
    { label: "River Region Guide", href: "/publications/river-region-guide" },
    { label: "Hunting Guide", href: "/publications/hunting-guide" },
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
              className="inline-block mb-4"
            >
              <img
                src="/images/logo.png"
                alt="Hill Country Sun"
                className="h-10 sm:h-12 w-auto brightness-0 invert"
              />
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
              <CopyEmail
                email="info@hillcountrysun.com"
                className="text-primary-200 hover:text-white"
              />
              <CopyPhone
                phone="(512) 847-5162"
                className="text-primary-200 hover:text-white"
              />
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

          {/* Publications Links */}
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-3 sm:mb-4">
              Publications
            </h3>
            <ul className="space-y-2">
              {footerLinks.publications.map((link) => (
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
