import React, { useState } from 'react';
import chroma from 'chroma-js';
import styles from './NewExpense.module.css';
import CreatableSelect from 'react-select/creatable';
import Button from '../Button/Button';
import { Tokens } from '../../.mirrorful/theme';
import { getDatabase, ref, set } from 'firebase/database';

function NewExpense({ addExpense, setNewAmount, newAmount, demo }) {
  const [category, setCategory] = useState('');

  const options = [
    { value: 'home', label: 'Home', color: '#00B8D9' },
    { value: 'food', label: 'Food', color: '#0989F8' },
    { value: 'shopping', label: 'Shopping', color: '#F8BB00' },
    { value: 'utilities', label: 'Utilities', color: '#FE8D00' },
    { value: 'household', label: 'Household', color: '#A5A8F8' },
    { value: 'transportation', label: 'Transportation', color: '#46D7A8' },
    { value: 'other', label: 'Other', color: '#3ACB5F' },
  ];

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  return (
    <div className={styles.newExpense}>
      <h2>Add a new expense</h2>
      <span>Select a category</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addExpense(category);
          setNewAmount('');
        }}
        className={styles.input}
      >
        <CreatableSelect
          className={styles.categoryList}
          styles={colourStyles}
          options={options}
          onChange={(e) => setCategory(e.value)}
        />
        <div className={styles.amount}>
          <span>Add amount</span>
          <input
            type="number"
            placeholder="$"
            name="expense"
            className={styles.expense}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
        </div>

        <Button style={{ width: '250px' }}>Submit</Button>
      </form>
    </div>
  );
}

export default NewExpense;
