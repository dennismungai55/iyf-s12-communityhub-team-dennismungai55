import { useState, useEffect } from "react";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Avatar({ src, alt, name = "", size = "medium" }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-14 h-14 text-base",
  };

  const resolvedSize = sizeClasses[size] || sizeClasses.medium;
  const showImage = Boolean(src) && !imgError;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none ${resolvedSize}`}
      title={alt || name}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || "User avatar"}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-semibold">
          {getInitials(name || alt)}
        </span>
      )}
    </span>
  );
}
