import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
//import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

  const emailSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setWrongEmail(true);
        return errorCode + errorMessage;
      });
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode + errorMessage;
    });

  const googleLogin = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return errorCode + errorMessage + email + credential;
      });
  };

  const demoLogin = (e) => {
    setEmail('demo@demo.com');
    setPassword(process.env.REACT_APP_DEMO_PASSWORD);
  };

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

          <form onSubmit={emailSubmit}>
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
            <button onClick={googleLogin} className="google">
              Or sign-in with google
            </button>
            <button onClick={demoLogin} className="demo">
              Or try a demo
            </button>
          </form>
        </div>

        <p>
          Don't have an account? <Link to="/signup">Join free today</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
