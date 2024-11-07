import React from 'react';
import ProfileBadge from './ProfileBadge';
import classes from 'utils/classes';
import parseImg from 'utils/images';

function ProfileDelete({img, src, size, onClick, ...props}) {
  return (
    <ProfileBadge img={img} src={src} size={size}>
      <button className={classes('profile-delete', size)} onClick={onClick} {...props}>
        <img className={classes('profile-delete-img', size)} src={parseImg('ic_cancel.svg')} alt="deleted" />
      </button>
    </ProfileBadge>
  );
}

export default ProfileDelete;
