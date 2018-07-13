import React from 'react';

import classes from './Input.css';

const input = props => {
  let inputEle = null;
  switch (props.elementType) {
    case 'input':
      inputEle = (
        <input
          className={classes.InputEle}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputEle = (
        <textarea
          className={classes.InputEle}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputEle = (
        <input
          className={classes.InputEle}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEle}
    </div>
  );
};

export default input;
