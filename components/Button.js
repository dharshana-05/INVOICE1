// components/Button.js
import styles from "./Button.module.css";

export default function Button({ children, onClick, variant = "primary" }) {
  // `variant` can be 'primary' or 'secondary'
  const buttonClass =
    variant === "secondary" ? styles.secondary : styles.primary;
  return (
    <button className={`${styles.btn} ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
}