import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onClear?: () => void;
  hasActiveFilters?: boolean;
}

export function FilterDrawer({
  isOpen,
  onClose,
  children,
  onClear,
  hasActiveFilters = false,
}: FilterDrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="sm:hidden relative z-50">
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
          <DialogPanel className="fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <DialogTitle className="font-serif font-bold text-xl text-primary">
            Filters
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {children}
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-4 border-t border-gray-100 flex gap-3">
          {hasActiveFilters && onClear && (
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Results
          </button>
        </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
