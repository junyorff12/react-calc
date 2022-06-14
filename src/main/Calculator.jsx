import React, { useState } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';



function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [calcOperation, setCalcOperation] = useState(null);
  const [toClearDisplay, setToClearDisplay] = useState(false);
  const [values, setValues] = useState([0, 0]);
  const [currentValuesIndex, setCurrentValuesIndex] = useState(0);

  function clearMemory() {
    setDisplayValue('0');
    setCalcOperation(null);
    setToClearDisplay(false);
    setValues([0, 0]);
    setCurrentValuesIndex(0);
  }

  function addOperationDigit(operation) {
    if (values[0] === 0) return;

    if (currentValuesIndex === 0) {
      setCurrentValuesIndex(1);
      setCalcOperation(operation);
      setToClearDisplay(true);

    } else {
      const equals = operation === '=';
      const newValues = [...values];

      try {
        newValues[0] = eval(`${newValues[0]} ${calcOperation} ${newValues[1]}`);
      } catch (error) {
        newValues[0] = values[0];
      }

      newValues[1] = 0;

      setDisplayValue(newValues[0]);
      setToClearDisplay(!equals);
      setCalcOperation(equals ? null : operation);
      setValues(newValues);
      setCurrentValuesIndex(equals ? 0 : 1);

    }
  }

  function addDigit(digit) {
    if (digit === '.' && displayValue.includes('.')) return;

    const checkClearDisplay = displayValue === '0' || toClearDisplay === true;
    const actualValue = checkClearDisplay ? '' : displayValue;

    const newDisplayValue = actualValue + digit;
    const newValues = [...values];

    if (digit !== '.') newValues[currentValuesIndex] = parseFloat(newDisplayValue);

    setDisplayValue(newDisplayValue);
    setToClearDisplay(false);
    setValues(newValues);
    console.log(newValues);
  }

  return (
    <div className='calculator'>
      <Display value={displayValue} />
      <Button label="AC" click={clearMemory} triple />
      <Button label="/" click={addOperationDigit} operation />
      <Button label="7" click={addDigit} />
      <Button label="8" click={addDigit} />
      <Button label="9" click={addDigit} />
      <Button label="*" click={addOperationDigit} operation />
      <Button label="4" click={addDigit} />
      <Button label="5" click={addDigit} />
      <Button label="6" click={addDigit} />
      <Button label="-" click={addOperationDigit} operation />
      <Button label="1" click={addDigit} />
      <Button label="2" click={addDigit} />
      <Button label="3" click={addDigit} />
      <Button label="+" click={addOperationDigit} operation />
      <Button label="0" click={addDigit} double />
      <Button label="." click={addDigit} />
      <Button label="=" click={addOperationDigit} operation />
    </div>
  );
};

export default Calculator;