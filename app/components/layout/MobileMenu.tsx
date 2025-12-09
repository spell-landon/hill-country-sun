import { Link } from "@remix-run/react";
import { Dialog, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { X, ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  publicationItems: NavItem[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  publicationItems,
  currentPath,
}: MobileMenuProps) {
  const isPublicationActive = publicationItems.some((item) => currentPath.startsWith(item.href));
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="lg:hidden relative z-50">
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* Panel */}
        <TransitionChild
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <DialogTitle>
              <img
                src="/images/logo.png"
                alt="Hill Country Sun"
                className="h-8 w-auto"
              />
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
              {/* Main nav items before Publications */}
              {navItems.slice(0, 2).map((item) => (
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

              {/* Publications Disclosure */}
              <li>
                <Disclosure defaultOpen={isPublicationActive}>
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        className={`flex w-full items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                          isPublicationActive
                            ? "text-primary bg-gray-100"
                            : "text-gray-900 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        <span>Publications</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-1 space-y-1 pl-4">
                        {publicationItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={onClose}
                            className={`block px-4 py-2.5 text-base rounded-lg transition-colors ${
                              currentPath.startsWith(item.href)
                                ? "text-primary bg-gray-100 font-medium"
                                : "text-gray-600 hover:text-primary hover:bg-gray-50"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </li>

              {/* Remaining nav items (About) */}
              {navItems.slice(2, 3).map((item) => (
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
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
