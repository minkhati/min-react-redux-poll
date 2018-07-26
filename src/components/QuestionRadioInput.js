import React from 'react';

const QuestionRadioInput = ({
  handleChange,
  optionText,
  option,
  selectedOption
}) => {
  return (
    <p>
      <label>
        <input
          type="radio"
          value={option}
          checked={selectedOption === option}
          onChange={handleChange}
        />{' '}
        {optionText}
      </label>
    </p>
  );
};

export default QuestionRadioInput;
