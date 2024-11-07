import React from 'react';
import parseImg from 'utils/images';
import GradientButton from 'components/common/GradientButton';

const AlertModal = ({onClose}) => {
  const handleCharge = () => {
    onClose();
  };

  return (
    <div className="modal-content alert-modal">
      <div className="img-credit-lg">
        <img src={parseImg('img_credit_lg.svg')} alt="크레딧" />
      </div>
      <div className="desc">
        앗! 투표하기 위한 <span>크레딧</span>이 부족해요
      </div>
      <GradientButton handleClick={handleCharge}>확인</GradientButton>
    </div>
  );
};

export default AlertModal;
