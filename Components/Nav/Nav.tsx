import { useState } from 'react';
import styles from './Nav.module.css';
import Image from 'next/image';
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';

function Nav() {
  const user = useUser();

  return (
    <>
      {
        <div className={styles.nav}>
          <h3 className={styles.logo}>
            <a href="/dashboard">LoveDiner</a>o
          </h3>
          <div className="profile_name">
            <p>
              <a href="/profile">
                <Image
                  alt="Profile picture"
                  height={40}
                  width={40}
                  src={user?.user_metadata.picture}
                  style={{ borderRadius: '50%', marginRight: '10px' }}
                />
              </a>
            </p>
          </div>
        </div>
      }
    </>
  );
}

export default Nav;
