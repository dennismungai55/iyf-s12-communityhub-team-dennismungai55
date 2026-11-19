export default function Card({
  title,
  subtitle,
  footer,
  hoverable = true,
  className = "",
  children,
}) {
  return (
    <div
      className={[
        "bg-white rounded-lg border border-gray-200 shadow-sm p-6",
        hoverable ? "hover:shadow-md transition-shadow duration-200" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      <div className="text-gray-700">{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
          {footer}
        </div>
      )}
    </div>
  );
}
