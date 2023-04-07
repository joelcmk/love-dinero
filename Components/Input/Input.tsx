import styles from './Input.module.css';
function Input({ variant, placeholder, value, onChange, type }) {
  return (
    <input
      className={`${styles.wrapper} ${styles[variant]}`}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
    ></input>
  );
}

export default Input;
