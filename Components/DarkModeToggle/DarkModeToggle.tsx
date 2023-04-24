import { useEffect, useState } from 'react';
import { useDocument } from '../useDocument';
import styles from './DarkModeToggle.module.css';

function DarkModeToggle() {
  const [item, setItem] = useState(null);
  const [checked, setChecked] = useState(false); // [1
  const document = useDocument();

  useEffect(() => {
    // Perform localStorage action
    return setItem(localStorage);
  }, []);

  const currentTheme = item?.getItem('theme');

  useEffect(() => {
    if (currentTheme) {
      document?.querySelector('body')?.setAttribute('data-theme', currentTheme);
      setChecked(currentTheme === 'dark' ? true : false);
    }
  }, [currentTheme]);

  function switchTheme(e) {
    if (e.target.checked) {
      document?.querySelector('body')?.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setChecked(true);
    } else {
      document?.querySelector('body')?.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setChecked(false);
    }
  }

  return (
    <>
      <label className={styles.themeSwitch}>
        <input
          type="checkbox"
          style={{ display: 'none' }}
          checked={checked}
          onChange={switchTheme}
        />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
    </>
  );
}

export default DarkModeToggle;
