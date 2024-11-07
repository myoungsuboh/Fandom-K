import parseImg from 'utils/images';
import formatWithCommas from 'utils/formatWithCommas';
import {calculateExpire, calculatePercentage} from 'utils/calculate';

function ArtistCreditBar({receivedDonations, deadline, targetDonation}) {
  return (
    <div className="artist-donation-container">
      <div className="artist-donation-top">
        <div className="artist-donation-left">
          <img src={parseImg('ic_creditIcon.svg')} alt="Credit Icon" className="artist-credit-icon" />
          <div className="received-credit">{formatWithCommas(receivedDonations)}</div>
        </div>
        <div className="deadline artist-donation-right">{`${calculateExpire(deadline)}일 남음`}</div>
      </div>
      <div className="artist-donation-bottom credit-gauge-bar-container">
        <div className="gauge-bar" style={{width: `${calculatePercentage(receivedDonations, targetDonation)}%`}}></div>
      </div>
    </div>
  );
}

export default ArtistCreditBar;
