/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import NewExpense from '../NewExpense/NewExpense';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
//import './Budget.css';

import { getDatabase, ref, onValue, update } from 'firebase/database';

function Budget({ data, income, length }) {
  const [userId, setUserId] = useState();
  data = data ? data : [];

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId + '/target');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {
        setTarget({ home: 0 });
      } else {
        setTarget(data);
        setHome(data.home);
        setFood(data.food);
        setShopping(data.shopping);
        setUtilities(data.utilities);
        setHousehold(data.household);
        setTransportation(data.transportation);
        setOther(data.other);
      }
    });
  }, [userId]);

  const [target, setTarget] = useState('');
  const [home, setHome] = useState('0');
  const [food, setFood] = useState('0');
  const [shopping, setShopping] = useState('0');
  const [utilities, setUtilities] = useState('0');
  const [household, setHousehold] = useState('0');
  const [transportation, setTransportation] = useState('0');
  const [other, setOther] = useState('0');

  const [updateTarget, setUpdateTarget] = useState(false);
  const [expense, setExpense] = useState('');

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        navigate('/login');
      }
    });
  });

  // Categories total
  function filter(category) {
    let filteredCategory = data
      ? data.filter((item) => item.category === category)
      : '';
    const result = filteredCategory
      ? filteredCategory.map((item) => item.expense)
      : '';

    return result;
  }

  function categoryTotal(category) {
    let total = 0;

    for (let i = 0; i < filter(category).length; i++) {
      total += filter(category)[i];
    }

    return total;
  }

  function allCategoriesTarget() {
    setUpdateTarget(!updateTarget);
    const db = getDatabase();
    if (updateTarget) {
      update(ref(db, 'users/' + userId + '/target'), {
        home: home,
        food: food,
        shopping: shopping,
        utilities: utilities,
        household: household,
        transportation: transportation,
        other: other,
      });
    }
  }

  const allCategories = [
    { name: 'home', color: '#00B8D9' },
    { name: 'food', color: '#0789F8' },
    { name: 'shopping', color: '#F9BA00' },
    { name: 'utilities', color: '#FE8C00' },
    { name: 'household', color: '#A6A8F8' },
    { name: 'transportation', color: '#47D7A8' },
    { name: 'other', color: '#3BCB60' },
  ];

  const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const allData = allCategories.map((data) => ({
    categoryName: capitalizeFirstLetter(data.name),
    category: data.name,
    expenses: categoryTotal(data.name),
    target: eval(data.name),
    updateTarget: eval(`set${capitalizeFirstLetter(data.name)}`),
    color: data.color,
  }));

  if (target) {
    return (
      <>
        <div className="budget">
          <Chart allData={allData} />
          <div className="test">
            <table className="expenses">
              <tr>
                <th>Category</th>
                <th>Expenses</th>
                <th>Target</th>
              </tr>
              {allData.map((item) => (
                <>
                  <tr>
                    <td>{item.categoryName}</td>
                    <td>
                      <span>$</span>
                      {item.expenses}
                    </td>
                    <td>
                      {!updateTarget ? (
                        <div className="edit">
                          <p className="">
                            <span>$</span>
                            {item.target === undefined ? '0' : item.target}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="number"
                            onChange={(e) => item.updateTarget(e.target.value)}
                            value={
                              item.category
                                ? item.target
                                : item.updateTarget('0')
                            }
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <button
                    className="update_button"
                    onClick={() => allCategoriesTarget()}
                  >
                    {!updateTarget ? 'update' : 'done'}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <NewExpense
            setExpense={setExpense}
            income={income}
            expense={expense}
            userId={userId}
            // eslint-disable-next-line no-restricted-globals
            length={length}
          />
        </div>
      </>
    );
  } else {
    return <p>loading</p>;
  }
}

export default Budget;
