import classes from 'utils/classes';
import parseImg from 'utils/images';

function ProfileBadge({src, size, selected, children, onClick}) {
  return (
    <div className={classes('profile-badge', size)} onClick={onClick}>
      <img src={src} className="profile-badge-img" alt="img_example" />
      {selected && (
        <div className={classes('selected', size)}>
          <img src={parseImg('ic_check.svg')} alt="selected" />
        </div>
      )}
      {children}
    </div>
  );
}

export default ProfileBadge;
