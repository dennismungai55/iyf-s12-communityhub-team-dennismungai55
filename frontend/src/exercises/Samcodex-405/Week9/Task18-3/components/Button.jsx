function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
