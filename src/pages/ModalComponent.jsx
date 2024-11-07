import React from 'react';
import GradientButton from 'components/common/GradientButton';
import Modal from 'components/common/Modal';
import useModal from 'hooks/useModal';
import {VoteModal} from 'components/modals';

const ModalComponent = () => {
  const {isModalOpen, openModal, closeModal} = useModal();

  const handleClick = () => {
    openModal();
  };

  return (
    <>
      <GradientButton handleClick={handleClick}>투표하기</GradientButton>
      {/* 모바일 풀팝업일때 name={'mobile-full'}사용 (예: 투표하기)  */}
      {isModalOpen && (
        <Modal name={'mobile-full'} title={'이달의 여자아이돌'} onClose={closeModal}>
          <VoteModal onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default ModalComponent;
