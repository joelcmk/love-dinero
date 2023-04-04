import { useState } from 'react';
import styles from './Nav.module.css';

function Nav() {
  const [profileName, setProfileName] = useState('');

  return (
    <>
      {
        <div className={styles.nav}>
          <h3 className={styles.logo}>
            <a href="/">LoveDiner</a>o
          </h3>
          <div className="profile_name">
            <p>{profileName}</p>
          </div>
        </div>
      }
    </>
  );
}

export default Nav;
