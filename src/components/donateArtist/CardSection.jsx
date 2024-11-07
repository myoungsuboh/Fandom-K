import ArtistCreditBar from './ArtistCreditBar';
import GradientButton from 'components/common/GradientButton';
import Modal from 'components/common/Modal';
import {DonationModal} from 'components/modals';
import useModal from 'hooks/useModal';

function CardSection({id, idol, adLocation, donationTitle, receivedDonations, deadline, targetDonation}) {
  const {profilePicture, group, name} = idol;
  const {isModalOpen, openModal, closeModal} = useModal();
  return (
    <>
      <div className="card-container">
        <div className="card-top-wrapper">
          <img src={profilePicture} className="card-img" alt={`${group} ${name}`} />
          <GradientButton name="donation-button" handleClick={openModal}>
            응원하기
          </GradientButton>
        </div>
        <div className="card-texts">
          <div className="ad-location">{adLocation}</div>
          <div className="donation-title">{donationTitle}</div>
        </div>
        <ArtistCreditBar receivedDonations={receivedDonations} deadline={deadline} targetDonation={targetDonation} />
      </div>
      {isModalOpen && (
        <Modal title="응원하기" onClose={closeModal}>
          <DonationModal id={id} idol={idol} title={donationTitle} ad={adLocation} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default CardSection;
