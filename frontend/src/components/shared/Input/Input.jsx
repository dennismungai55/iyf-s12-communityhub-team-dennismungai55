export default function Input({
  label,
  error,
  helperText,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  id,
  disabled = false,
  required = false,
}) {
  const inputId = id || name;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
              ? `${inputId}-help`
              : undefined
        }
        className={[
          "w-full px-3 py-2 border rounded-md transition-colors",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500 text-red-900"
            : "border-gray-300 focus:ring-blue-500 text-gray-900",
          disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-white",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p id={`${inputId}-help`} className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
