function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div
      className="loading-spinner"
      role="status"
      aria-live="polite"
    >
      <span className="spinner" aria-hidden="true"></span>
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;