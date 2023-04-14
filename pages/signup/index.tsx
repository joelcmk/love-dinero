import Nav from '../../Components/Nav/Nav';
import { Tokens } from '../../.mirrorful/theme';
import Button from '../../Components/Button/Button';
import { useState } from 'react';
import styles from './Signup.module.css';

import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';

const Signup = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

  const handleSignUp = async (e) => {
    supabase.auth.signUp({
      email: 'joelcmk+ls@gmail.com',
      password: 'example-password',
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    });
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div className={styles.loginImage}></div>
      <div className={styles.loginAuth}>
        <div className={styles.loveDinero}>
          <span>Love</span>
          <span>Dinero</span>
        </div>

        <div className="emailLogin">
          <p>Hey there,</p>
          <h2 style={{ marginLeft: '5px', marginBottom: '10px' }}>
            Create a free account
          </h2>
          <div style={{ maxWidth: '256.5px', color: 'red' }}>
            {wrongEmail ? (
              <span>Please re-enter you email and password.</span>
            ) : (
              ''
            )}
          </div>

          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Email</p>
            <input
              className={styles.input}
              placeholder="you@email.com"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <input
              className={styles.input}
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={handleSignUp}
              style={{ backgroundColor: Tokens.colors.button.base }}
            >
              Create
            </Button>
          </form>
        </div>
        <p>
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
