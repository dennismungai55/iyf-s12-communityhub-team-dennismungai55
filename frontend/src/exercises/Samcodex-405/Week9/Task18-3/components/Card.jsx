function Card({ title, children }) {
  return (
    <article className="component-card">
      {title && <h2>{title}</h2>}

      <div>{children}</div>
    </article>
  );
}

export default Card;
