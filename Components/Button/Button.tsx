import styles from './Button.module.css';
function Button({ children, variant, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.wrapper} ${styles[variant]}`}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
