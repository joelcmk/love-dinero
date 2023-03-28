import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
//import './nav.css';

const Navbar = function () {
  const [pp, setPp] = useState();
  const [profileName, setProfileName] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.photoURL === null) {
          if (user.displayName === null) {
            setProfileName('hello');
          } else {
            setProfileName(user.displayName[0]);
          }
        } else {
          setPp(user.photoURL);
        }
      } else {
        navigate('/login');
      }
    });
  }, [auth, navigate, user]);

  return (
    <>
      {user && (
        <div className="nav">
          <Link to="/">
            <h3>LoveDinero</h3>
          </Link>
          <Link to="/profile">
            {profileName !== '' ? (
              <div className="profile_name">
                <p>{profileName}</p>
              </div>
            ) : (
              <img className="pp" alt="profile_picture" src={pp} />
            )}
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
