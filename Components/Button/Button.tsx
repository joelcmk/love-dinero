import styles from './Button.module.css';
function Button({ children, style, onClick }) {
  return (
    <button
      id={styles.test}
      onClick={onClick}
      className={styles.button}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
