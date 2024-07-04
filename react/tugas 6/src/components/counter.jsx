// components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../redux/store';

const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter Value: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
