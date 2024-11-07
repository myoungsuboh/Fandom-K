import React from 'react';
import classes from 'utils/classes';

function GradientButton({children, name, handleClick, disabled}) {
  return (
    <button type="button" className={classes('button-gradient', name)} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default GradientButton;
