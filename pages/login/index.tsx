import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Login.module.css';
import { Tokens } from '../../.mirrorful/theme';

import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/input';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

  const session = useSession();
  const supabase = useSupabaseClient();

  const router = useRouter();

  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user]);

  function handleDemoLogin(event) {
    event.preventDefault();
    router.push('/dashboard');
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div className={styles.loginImage}></div>
      <div className={styles.loginAuth}>
        <div className={styles.loveDinero}>
          <span>Love</span>
          <span>Dinero</span>
        </div>

        <div className="emailLogin">
          <p>Welcome back,</p>
          <h2 style={{ marginLeft: '5px', marginBottom: '10px' }}>
            Login to your account
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

            <Input
              placeholder="you@email.com"
              variant="login"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>

            <Input
              variant="login"
              className={styles.input}
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button>Submit</Button>
            <Button variant="google">Or sign-in with Google</Button>
            <Button
              onClick={(event) => {
                handleDemoLogin(event);
              }}
              variant="demo"
            >
              Or try a demo
            </Button>
          </form>
        </div>
        <p>
          Don&apos;t have an account?{' '}
          <a
            style={{ color: Tokens.colors.text.green, fontWeight: 'bold' }}
            href="/signup"
          >
            Join free today
          </a>
        </p>
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          ) : (
            <>
              {console.log('dldlj')}
              <p>Account page will go here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
