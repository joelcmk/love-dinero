import React from 'react';
import App from './App';
import { data, sum, total, categoryTotal, filter } from './state-functions';


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('forEach function', () => {
  expect(total()).toBe(100)
})

test('filter home', () => {
  expect(filter('home')).toEqual([13, 56]);
})


test('home total', () => {
  expect(categoryTotal('home')).toEqual(69);
})

test('transportation total', () => {
  expect(categoryTotal('transportation')).toEqual(100);
});

test('utilities total', () => {
  expect(categoryTotal('utilites')).toEqual(0);
})
