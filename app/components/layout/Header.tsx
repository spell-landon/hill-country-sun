import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import { Menu as MenuIcon, ChevronDown } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MobileMenu } from "./MobileMenu";
import { Container } from "~/components/ui/Container";

const navItems = [
  { label: "Articles", href: "/articles" },
  { label: "Calendar", href: "/calendar" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const publicationItems = [
  { label: "Hill Country Sun", href: "/publications/hill-country-sun" },
  { label: "Welcome to Wimberley", href: "/publications/welcome-to-wimberley" },
  { label: "River Region Guide", href: "/publications/river-region-guide" },
  { label: "Hunting Guide", href: "/publications/hunting-guide" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container size="wide" as="nav" aria-label="Main navigation">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-serif font-bold text-xl md:text-2xl"
            aria-label="Hill Country Sun - Home"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 text-secondary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="hidden sm:inline">Hill Country Sun</span>
            <span className="sm:hidden">HCS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Publications Dropdown */}
            <Menu as="div" className="relative">
              <MenuButton
                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  publicationItems.some((item) => location.pathname.startsWith(item.href))
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                Publications
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </MenuButton>
              <MenuItems
                anchor="bottom start"
                className="absolute z-50 mt-1 w-56 origin-top-left rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                {publicationItems.map((item) => (
                  <MenuItem key={item.href}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={`block px-4 py-2 text-sm ${
                          location.pathname.startsWith(item.href)
                            ? "text-primary bg-gray-50 font-medium"
                            : active
                            ? "text-primary bg-gray-50"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            <div className="ml-2 flex items-center gap-2">
              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === "/about"
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                About
              </Link>
              <Link to="/contact" className="btn-primary btn-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open main menu"
          >
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        publicationItems={publicationItems}
        currentPath={location.pathname}
      />
    </header>
  );
}
