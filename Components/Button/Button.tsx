import styles from './Button.module.css';
function Button({ children, style, onClick }) {
  return (
    <button onClick={onClick} style={style} className={styles.Button}>
      {children}
    </button>
  );
}

export default Button;
