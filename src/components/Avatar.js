import React from 'react';

const Avatar = ({ divClassName, avatar, name, avatarClassName }) => {
  return (
    <div className={divClassName}>
      <img src={avatar} alt={`Avatar of ${name}`} className={avatarClassName} />
    </div>
  );
};

export default Avatar;
