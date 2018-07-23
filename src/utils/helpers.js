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
