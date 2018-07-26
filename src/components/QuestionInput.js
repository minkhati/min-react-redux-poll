import React from 'react';

const QuestionInput = ({ handleChange, optionText, option }) => {
  return (
    <input
      className="question-option"
      type="text"
      placeholder={`Enter Option ${option} Text Here`}
      value={optionText}
      onChange={handleChange}
      maxLength={80}
    />
  );
};

export default QuestionInput;
