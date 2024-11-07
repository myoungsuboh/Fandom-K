import {Link, useLocation, useNavigate} from 'react-router-dom';
import parseImg from 'utils/images';

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const clickLogo = () => {
    // 현재 페이지로 새로고침
    if (location.pathname === '/list') window.location.reload();
    else navigate('/list');
  };

  return (
    <div className="nav">
      <div className="button-containter">
        <button type="button" onClick={clickLogo} /*클릭시 새로고침 페이지로 넘어가기*/ className="nav-logo-btn">
          <img src={parseImg('img_logo.svg')} alt="로고" />
        </button>
        <Link to="/my-page" /*클릭시 /mypage로 이동, 프로필 이미지는 자유*/ className="moving-mypage-button">
          <img src={parseImg('img_userProfile.svg')} alt="내프로필사진" className="nav-profile-img" />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
