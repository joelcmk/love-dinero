import { useEffect, useState } from 'react';
import { useDocument } from '../useDocument';
import styles from './DarkModeToggle.module.css';

import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';

function DarkModeToggle() {
  const [item, setItem] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // [1
  const document = useDocument();

  useEffect(() => {
    // Perform localStorage action
    return setItem(localStorage);
  }, []);

  const currentTheme = item?.getItem('theme');

  useEffect(() => {
    if (currentTheme) {
      document?.querySelector('body')?.setAttribute('data-theme', currentTheme);
      setDarkMode(currentTheme === 'dark' ? true : false);
    }
  }, [currentTheme]);

  function handleDarkMode() {
    if (darkMode) {
      document?.querySelector('body')?.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document?.querySelector('body')?.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  }

  return (
    <div className={styles.darkMode}>
      {darkMode ? (
        <MdOutlineWbSunny size="1.5em" color="white" onClick={handleDarkMode} />
      ) : (
        <MdOutlineDarkMode
          size="1.5em"
          color="white"
          onClick={handleDarkMode}
        />
      )}
    </div>
  );
}

export default DarkModeToggle;
