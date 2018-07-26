export const formatDate = timestamp => {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
};

export function formatQuestion(question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = author;
  const optionOneAnswered = optionOne.votes.includes(authedUser);
  const optionTwoAnswered = optionTwo.votes.includes(authedUser);
  const hasAnswered = optionOneAnswered || optionTwoAnswered;

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
    authedUser,
    optionOneAnswered,
    optionTwoAnswered,
    hasAnswered
  };
}

export function formatAllQuestions(formattedQuestions) {
  const formattedAnsweredQuestion = formattedQuestions
    .filter(question => question.hasAnswered === true)
    .sort((a, b) => b.timestamp - a.timestamp);

  const formattedUnAnsweredQuestion = formattedQuestions
    .filter(question => question.hasAnswered === false)
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    formattedAnsweredQuestion,
    formattedUnAnsweredQuestion
  };
}

export function computeStats(question) {
  const optionOneTotalVotes = question.optionOne.votes.length;
  const optionTwoTotalVotes = question.optionTwo.votes.length;

  const totalVotes = optionOneTotalVotes + optionTwoTotalVotes || 1;

  const optionOnePercent = Math.floor(optionOneTotalVotes / totalVotes * 100);
  const optionTwoPercent = Math.floor(optionTwoTotalVotes / totalVotes * 100);

  return {
    totalVotes,
    optionOneTotalVotes,
    optionTwoTotalVotes,
    optionOnePercent,
    optionTwoPercent
  };
}
