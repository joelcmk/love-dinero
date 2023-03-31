import { useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

  return (
    <div className="Login">
      <div className="login-image"></div>
      <div className="login-auth">
        <div className="love-dinero">
          <span>Love</span>
          <span>Dinero</span>
        </div>

        <div className="email-login">
          <p>Welcome back,</p>
          <h2>Login to your account</h2>
          <div className="wrong-email">
            {wrongEmail ? (
              <span>Please re-enter you email and password.</span>
            ) : (
              ''
            )}
          </div>

          <form>
            <p>Email</p>
            <input
              placeholder="you@email.com"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-btn">Submit</button>
            <button className="google">Or sign-in with google</button>
            <button className="demo">Or try a demo</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
