import { useState } from 'react';
import styles from './Nav.module.css';
import Image from 'next/image';
import Button from '../Button/Button';
import { useRouter } from 'next/router';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

function Nav({ setExpensesList, demo }) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.nav}>
        <h3 className={styles.logo}>
          <a onClick={() => setExpensesList(false)}>LoveDinero</a>
        </h3>
        <div
          style={{
            flexGrow: '2',
            textAlign: 'right',
            boxSizing: 'border-box',
            height: '34px',
          }}
        ></div>
        <div className={styles.profile}>
          <p style={{ cursor: 'pointer' }}>Account</p>
          <div className={styles.subMenu}>
            <Button
              style={{
                width: '180px',
                margin: '0 auto',
                marginTop: '5px',
                marginBottom: '5px',
              }}
              onClick={() => setExpensesList(true)}
            >
              Expenses
            </Button>
            <Button
              style={{ width: '180px', margin: '0 auto', marginTop: '5px' }}
              onClick={() =>
                demo ? router.push('/signup') : supabase.auth.signOut()
              }
              variant={demo ? 'update' : 'delete'}
            >
              {demo ? 'Sign Up' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
