
import { useState } from 'react';

const MAX_ARRAY_LENGTH = 50;
const MIN_ARRAY_LENGTH = 1;

export const useNumberArray = (defaultArray: number[]) => {

  const [array, setArray] = useState(defaultArray);

  const addNumber = (number: number = 0) => {
    if (array.length < MAX_ARRAY_LENGTH) {
      setArray([...array, number]);
    }
  };

  const removeNumber = (index: number) => {
    if (array.length > MIN_ARRAY_LENGTH) {
      setArray(array => array.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, number: number) => {

    setArray(arr => arr.map((n, i) => i === index ? number : n));
  };

  return { array, addNumber, removeNumber, updateNumber };
};