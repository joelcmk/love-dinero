import React, { useState, useEffect } from 'react';
import Budget from './components/Budget/Budget';
import ExpensesList from './components/ExpensesList';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import firebase from 'firebase/compat/app';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import { getAuth } from 'firebase/auth';
//import './api/App.css';

import { firebaseConfig } from './utils/firebase';

import { Routes, Route, HashRouter } from 'react-router-dom';

import { getDatabase, ref, onValue } from 'firebase/database';

//console.log(typeof window === 'undefined');

const App = function () {
  firebase.initializeApp(firebaseConfig);

  const auth = getAuth();
  const user = auth.currentUser;

  const [pp, setPp] = useState();
  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  const [length, setLength] = useState();

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user, auth]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data[id]);
      }
      setData(list);
      setLength(list.length + 1);
    });
  }, [userId]);

  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Budget data={data} userId={userId} length={length} />}
          />
          <Route
            exact
            path="/expenses"
            element={<ExpensesList data={data} userId={userId} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile pp={pp} />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
