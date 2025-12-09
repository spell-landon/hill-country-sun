import { Link } from "@remix-run/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentPath,
}: MobileMenuProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <DialogTitle className="flex items-center gap-2 font-serif font-bold text-xl text-primary">
              <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
              Menu
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      currentPath === item.href
                        ? "text-primary bg-gray-100"
                        : "text-gray-900 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-100">
            <Link
              to="/contact"
              onClick={onClose}
              className="btn-primary btn-md w-full"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
