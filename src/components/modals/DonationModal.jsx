import React, {useState} from 'react';
import parseImg from 'utils/images';
import GradientButton from 'components/common/GradientButton';
import {useDispatch, useSelector} from 'react-redux';
import {decreseCredit} from 'services/apiSlice';
import {stringToNumber, formattingCredit} from 'utils/credit';
import {setDonation} from 'services/apiSlice';

const DonationModal = ({id, idol, title, ad, onClose}) => {
  const {name, group, profilePicture} = idol;
  const [credit, setCredit] = useState('');
  const dispatch = useDispatch();
  const myCredits = useSelector(state => state.data.myCredits);

  /**
   * input을 숫자만 입력 가능하도록 validation
   */
  const handleCreditChange = ({target}) => setCredit(formattingCredit(target.value));

  const isValid = stringToNumber(credit) <= myCredits;

  const handleDonate = () => {
    const parsedCredit = parseInt(credit);
    if (!parsedCredit) return alert('크레딧을 입력하세요.');

    dispatch(decreseCredit(credit));
    dispatch(setDonation({id, amount: parsedCredit}));
    localStorage.setItem('myCredits', myCredits - parsedCredit);

    alert(`${parsedCredit} 크레딧이 후원되었습니다.`);
    onClose();
  };
  return (
    <div className="modal-content donation-modal">
      <div className="card">
        <div className="card-img">
          <img src={profilePicture} alt={`${group} ${name}`} />
        </div>
        <p className="card-sub">{ad}</p>
        <p className="card-tit">{title}</p>
      </div>
      <div className="donation-input">
        <div className={`input-box ${!isValid ? 'error' : ''}`}>
          <input type="text" value={credit} onChange={handleCreditChange} placeholder="크레딧 입력" />
          <img src={parseImg('img_credit_md.svg')} alt="크레딧" />
        </div>
        {!isValid && <p className="input-error">갖고 있는 크레딧보다 더 많이 후원할 수 없어요</p>}
      </div>
      <GradientButton handleClick={handleDonate} disabled={!isValid || !credit}>
        응원하기
      </GradientButton>
    </div>
  );
};

export default DonationModal;
