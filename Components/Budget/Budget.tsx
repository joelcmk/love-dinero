import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Budget.module.css';

function Budget({ expenses }) {
  const [target, setTarget] = useState(true);

  console.log(expenses);

  const [updateTarget, setUpdateTarget] = useState(false);

  function total(expense) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].category === expense) {
        total += expenses[i].amount;
      }
    }
    return total;
  }

  //const homeTotal = expenses.filter((expense) => expense.category === 'home');

  console.log(total('home'));

  return (
    <div className={styles.budget}>
      <div className={styles.wrapper}>
        <table className={styles.expenses}>
          <tbody>
            <tr>
              <th>Category</th>
              <th>Expenses</th>
              <th>Target</th>
            </tr>
            <tr>
              <td>Home</td>
              <td>${total('home')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Food</td>
              <td>${total('food')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Shopping</td>
              <td>${total('shopping')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Utilities</td>
              <td>${total('utilities')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Household</td>
              <td>${total('household')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td>${total('transportation')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Ohter</td>
              <td>${total('other')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <Button variant="update">
                  {!updateTarget ? 'Update' : 'Done'}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Budget;
