import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {increseCredit} from 'services/apiSlice';
import parseImg from 'utils/images';
import GradientButton from 'components/common/GradientButton';
import formatWithCommas from 'utils/formatWithCommas';

const ChargeModal = ({onClose}) => {
  const options = [
    {id: 1, label: '100', value: 100},
    {id: 2, label: '500', value: 500},
    {id: 3, label: '1000', value: 1000},
  ];

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const myCredits = useSelector(state => state.data.myCredits);

  const handleChange = e => {
    setSelectedOption(Number(e.target.value));
  };

  const handleCharge = () => {
    dispatch(increseCredit(selectedOption));
    localStorage.setItem('myCredits', myCredits + selectedOption);
    alert(`${selectedOption} 크레딧이 충전되었습니다.`);
    onClose();
  };

  return (
    <div className="modal-content charge-modal">
      {options.map(option => (
        <label key={option.id} className={`custom-radio ${selectedOption === option.value ? 'active' : ''}`}>
          <div className="img-credit-sm">
            <img src={parseImg('img_credit_sm.svg')} alt="크레딧" />
          </div>
          <div className="charge-info">{formatWithCommas(option.label)}</div>
          <input type="radio" value={option.value} checked={selectedOption === option.value} onChange={handleChange} />
          <span className="radio-check"></span>
        </label>
      ))}
      <GradientButton handleClick={handleCharge}>
        <img src={parseImg('img_credit_white.svg')} alt="크레딧" />
        충전하기
      </GradientButton>
    </div>
  );
};

export default ChargeModal;
