import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Budget.module.css';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineCar,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbFridge } from 'react-icons/tb';

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
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineHome />} <p style={{ marginLeft: '1em' }}>Home</p>
                </div>{' '}
              </td>
              <td>${total('home')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<IoFastFoodOutline color="#0989F8" />}{' '}
                  <p style={{ marginLeft: '1em' }}>Food</p>
                </div>
              </td>
              <td>${total('food')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineShopping />}
                  <p style={{ marginLeft: '1em' }}>Shopping</p>
                </div>
              </td>

              <td>${total('shopping')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineCreditCard color="#FE8D00" />}
                  <p style={{ marginLeft: '1em' }}>Utilities</p>
                </div>
              </td>
              <td>${total('utilities')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<TbFridge />}
                  <p style={{ marginLeft: '1em' }}>Household</p>
                </div>
              </td>
              <td>${total('household')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineCar color="#46D7A8" />}
                  <p style={{ marginLeft: '1em' }}>Transportation</p>
                </div>
              </td>
              <td>${total('transportation')}</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineAppstoreAdd />}
                  <p style={{ marginLeft: '1em' }}>Other</p>
                </div>
              </td>
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
