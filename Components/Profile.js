import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
//import './nav.css';

const Profile = function () {
  const [email, setEmail] = useState();
  const [pp, setPp] = useState();
  const [name, setName] = useState();

  const logout = () => {
    auth.signOut().then(() => {});
    localStorage.clear();
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setPp(user.photoURL);
        setName(user.displayName);
      } else {
        navigate('/login');
      }
    });
  }, [auth, navigate, user]);

  return (
    <div className="profile">
      <div className="profile_card">
        <div>
          <img className="" alt="profile_picture" src={pp} />
          <h2>Hello {name}</h2>
          <h2>Email: {email}</h2>
          <Link className="expenses_list" to="/expenses">
            <button>Expenses List</button>
          </Link>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
