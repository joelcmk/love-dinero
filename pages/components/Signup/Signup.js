import { useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
//import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const navigate = useNavigate();

  const createAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorCode + errorMessage;
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  console.log(email);

  return (
    <div className="Login">
      <div className="login-image"></div>
      <div className="login-auth">
        <div className="love-dinero">
          <span>Love</span>
          <span>Dinero</span>
        </div>

        <div className="email-login">
          <p>Hey there,</p>
          <h2>Create a free account</h2>

          <form onSubmit={createAccount}>
            <p>Email</p>
            <input
              placeholder="you@email.com"
              value={email}
              type="email"
              onChange={handleEmail}
            />
            <p>Password</p>
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={handlePassword}
            />
            <button className="login-btn">Create</button>
          </form>
        </div>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
