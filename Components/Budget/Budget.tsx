import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Budget.module.css';
import { Tokens } from '../../.mirrorful/theme';

function Budget() {
  const [target, setTarget] = useState(true);

  const [updateTarget, setUpdateTarget] = useState(false);

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
              <td>$25</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Food</td>
              <td>$30</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Shopping</td>
              <td>$30</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Utilities</td>
              <td>$30</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Household</td>
              <td>$30</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td>$30</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Ohter</td>
              <td>$30</td>
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
