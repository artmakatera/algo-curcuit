
import { useState } from 'react';

const MAX_ARRAY_LENGTH = 50;
const MIN_ARRAY_LENGTH = 1;

export const useNumberArray = (
  defaultArray: number[],
  minArrLength: number = MIN_ARRAY_LENGTH,
  maxArrLength: number = MAX_ARRAY_LENGTH
) => {

  const [array, setArray] = useState(defaultArray);

  const addNumber = (number: number = 0) => {
    if (array.length < maxArrLength) {
      setArray([...array, number]);
    }
  };

  const removeNumber = (index: number) => {
    if (array.length > minArrLength) {
      setArray(array => array.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, number: number) => {

    setArray(arr => arr.map((n, i) => i === index ? number : n));
  };

  return { array, addNumber, removeNumber, updateNumber };
};