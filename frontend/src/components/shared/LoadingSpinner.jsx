export default function LoadingSpinner({
  size = "medium",
  text = "Loading...",
}) {
  return (
    <div className={`loading-spinner ${size}`} role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>{text}</p>
    </div>
  );
}
