import styles from "./Button.module.css";

export default function Button({ variant = "primary", children, ...props }) {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      type={props.type || "button"}
      className={`${styles.button} ${variantClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
