import { useState } from 'react';
import styles from './Nav.module.css';
import Image from 'next/image';
import Button from '../Button/Button';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';

function Nav() {
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.nav}>
        <h3 className={styles.logo}>
          <a href="/dashboard">LoveDiner</a>o
        </h3>
        <div
          style={{
            flexGrow: '2',
            textAlign: 'right',
            boxSizing: 'border-box',
            height: '34px',
          }}
        >
          <DarkModeToggle />
        </div>
        <div className={styles.profile}>
          <p>Account</p>
          <div className={styles.subMenu}>
            <Button
              style={{ width: '180px', margin: '0 auto', marginTop: '5px' }}
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
