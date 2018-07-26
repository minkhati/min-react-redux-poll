import React from 'react';
import { Line } from 'rc-progress';

const QuestionOption = ({
  optionAnswered,
  option,
  optionPercent,
  optionTotalVotes,
  totalVotes
}) => {
  return (
    <div className="ans-option">
      {optionAnswered === true ? (
        <div className="your-vote">Your vote</div>
      ) : null}
      <span style={{ marginRight: '20px' }}>{`Would you rather ${
        option.text
      }?`}</span>
      <Line
        style={{ marginTop: '20px' }}
        percent={optionPercent}
        strokeWidth="8"
        strokeColor="green"
      />
      <p
        className="center"
        style={{ fontWeight: 'bold', color: 'black' }}
      >{`${optionTotalVotes} out of ${totalVotes}`}</p>
    </div>
  );
};

export default QuestionOption;
