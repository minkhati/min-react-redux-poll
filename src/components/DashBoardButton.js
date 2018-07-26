import React from 'react';

const DashBoardButton = ({ answeredQuestion, value, handleClick, BtnText }) => {
  return (
    <button
      className={
        answeredQuestion === false ? 'option-active btn-option' : 'btn-option'
      }
      value={value}
      onClick={handleClick}
    >
      {BtnText}
    </button>
  );
};

export default DashBoardButton;
