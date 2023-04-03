import { useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import styles from './Login.module.css';
import { Tokens } from '../../../.mirrorful/theme';
import Button from '../Button/Button';

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

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

            <Button style={{ backgroundColor: Tokens.colors.button.base }}>
              Submit
            </Button>
            <Button style={{ backgroundColor: Tokens.colors.button.Google }}>
              Or sign-in with Google
            </Button>
            <Button style={{ backgroundColor: Tokens.colors.button.Demo }}>
              Or try a demo
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
