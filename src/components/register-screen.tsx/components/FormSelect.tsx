import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: FieldError;
}

const baseSelectClass =
  "w-full bg-surface-container-low border rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none";

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, placeholder, error, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-xs">
        <label
          htmlFor={fieldId}
          className="font-label-md text-label-md text-on-surface ml-base"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`${baseSelectClass} ${error ? "border-error" : "border-outline-variant"}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${fieldId}-error`}
            role="alert"
            className="text-body-sm text-error ml-base"
          >
            {error.message}
          </p>
        )}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";

export default FormSelect;
