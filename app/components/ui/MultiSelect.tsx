import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  className,
}: MultiSelectProps) {
  const hasSelection = selected.length > 0;

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      const option = options.find((o) => o.value === selected[0]);
      return option?.label || selected[0];
    }
    return `${selected.length} selected`;
  };

  return (
    <Listbox value={selected} onChange={onChange} multiple>
      <div className={clsx("relative", className)}>
        <ListboxButton
          className={clsx(
            "relative w-full min-w-[140px] pl-3 pr-9 py-2 text-left rounded-lg border text-body-sm font-medium cursor-pointer transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            hasSelection
              ? "bg-primary text-white border-primary"
              : "bg-surface text-text border-surface hover:border-primary/30"
          )}
        >
          <span className="block truncate">{getDisplayText()}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown
              className={clsx(
                "h-4 w-4",
                hasSelection ? "text-white" : "text-text-muted"
              )}
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          anchor="bottom start"
          className="absolute z-50 mt-1 max-h-60 w-auto min-w-[var(--button-width)] overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={({ active }) =>
                clsx(
                  "relative cursor-pointer select-none py-2 pl-10 pr-4 text-body-sm",
                  active ? "bg-surface text-primary" : "text-text"
                )
              }
            >
              {({ selected: isSelected }) => (
                <>
                  <span
                    className={clsx(
                      "block truncate",
                      isSelected ? "font-semibold" : "font-normal"
                    )}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
