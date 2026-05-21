import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const baseInputClass =
  "w-full bg-surface-container-low border rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline";

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-xs">
        <label
          htmlFor={fieldId}
          className="font-label-md text-label-md text-on-surface ml-base"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`${baseInputClass} ${error ? "border-error" : "border-outline-variant"}`}
          {...props}
        />
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
FormField.displayName = "FormField";

export default FormField;
