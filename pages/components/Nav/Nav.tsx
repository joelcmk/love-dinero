import { useState } from 'react';
import styles from './Nav.module.css';
import '../../../.mirrorful/theme.css';

function Nav() {
  const [profileName, setProfileName] = useState('');

  return (
    <>
      {
        <div className={styles.nav}>
          <h3 className={styles.logo}>LoveDinero</h3>
          <div className="profile_name">
            <p>{profileName}</p>
          </div>
        </div>
      }
    </>
  );
}

export default Nav;
