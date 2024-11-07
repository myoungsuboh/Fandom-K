import React, {useCallback, useEffect, useRef, useState} from 'react';
import GradientButton from 'components/common/GradientButton';
import ProfileBadge from 'components/common/ProfileBadge';
import formatWithCommas from 'utils/formatWithCommas';
import {useDispatch, useSelector} from 'react-redux';
import {getCharts, getVoteIdols, setVoteForIdol} from 'services/apiSlice';
import classes from 'utils/classes';
import useWindowSize from 'hooks/useWindowSize';

const initialState = {
  id: 0,
  name: '',
  gender: '',
  group: '',
  profilePicture: '',
  totalVotes: 0,
  teamId: 0,
  rank: 0,
};

const VoteModal = ({onClose}) => {
  const dispatch = useDispatch();
  const {voteIdols, chartGender} = useSelector(state => state.data);
  const {idols, nextCursor} = voteIdols;
  const device = useWindowSize();
  const endRef = useRef(null); // Infinite Scroll 구현을 위한 Ref 객체
  const [selectedIdol, setSelectedIdol] = useState(initialState);
  const pageSize = device === 'desktop' ? 10 : 5;

  const handleChange = e => {
    setSelectedIdol(JSON.parse(e.target.value));
  };

  const handleVotes = () => {
    const myCredits = +localStorage.getItem('myCredits');
    const payCredit = +process.env.REACT_APP_VOTES_VALUE;

    // onClose 메서드에 투표 여부 알여주기
    const checkVotingStatus = payCredit <= myCredits;
    if (checkVotingStatus) {
      dispatch(setVoteForIdol({idolId: selectedIdol.id}));
      localStorage.setItem('myCredits', myCredits - payCredit);
      alert(`${selectedIdol.group} ${selectedIdol.name}에게 투표하셨습니다.`);

      dispatch(getCharts({gender: chartGender, pageSize: pageSize}));
    }

    onClose(checkVotingStatus);
  };

  const handleScroll = useCallback(() => {
    if (nextCursor) dispatch(getVoteIdols({gender: chartGender, pageSize: 6, cursor: nextCursor}));
  }, [nextCursor, dispatch]);

  useEffect(() => {
    dispatch(getVoteIdols({gender: chartGender, pageSize: 6}));
  }, [dispatch]);

  /**
   * 감시 대상이 화면에 노출되면 서버에 데이터 요청
   */
  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) handleScroll();
    },
    [handleScroll],
  );

  /**
   * IntersectionObserver API를 이용해 endRef 객체가 화면에 노출됨을 감지
   */
  useEffect(() => {
    if (!endRef.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: endRef.current.parentNode,
      threshold: 1.0,
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [handleObserver, device]);

  return (
    <div className={classes('modal-content vote-modal', device === 'mobile' ? 'mobile-full' : '')}>
      <div className="vote-list">
        {selectedIdol &&
          idols.map((idol, idx) => (
            <label key={`custom-radio-${idx}`} className="custom-radio">
              <div className="vote-item">
                <ProfileBadge src={idol.profilePicture} selected={selectedIdol.id === idol.id} />
                <div className="vote-num">{idx + 1}</div>
                <div className="vote-info">
                  <p className="name">{`${idol.group} ${idol.name}`}</p>
                  <p className="count">{formatWithCommas(idol.totalVotes)}표</p>
                </div>
              </div>
              <input type="radio" key={`radio-${idx}`} value={JSON.stringify(idol)} checked={selectedIdol.id === idol.id} onChange={handleChange} />
              <span className="radio-check"></span>
            </label>
          ))}
        <div ref={endRef} style={{width: '100%', height: '1px'}} className="end-point" />
      </div>
      <div className="modal-bottom">
        <GradientButton handleClick={handleVotes}>투표하기</GradientButton>
        <div className="desc">
          투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
