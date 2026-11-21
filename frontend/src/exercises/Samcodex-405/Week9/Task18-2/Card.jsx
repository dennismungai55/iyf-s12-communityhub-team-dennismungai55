import styles from "./Card.module.css";

function Card({ title, description, children }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>

      {children}
    </article>
  );
}

export default Card;