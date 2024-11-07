import {useCallback, useEffect, useState} from 'react';
import SpreadCards from './SpreadCards';
import Pagination from './Pagination';
import {useDispatch, useSelector} from 'react-redux';
import {getDonations, resetDonations} from 'services/apiSlice';
import useWindowSize from 'hooks/useWindowSize';
import {useLocation} from 'react-router-dom';

function DonateArtist() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    donations: {list, nextCursor},
  } = useSelector(state => state.data);
  const [currentPage, setCurrentPage] = useState(0); // 슬라이싱 된 배열의 페이징을 위한 state : 초기값 0
  const device = useWindowSize();

  /**
   * 서버에 데이터가 더 있는 경우 데이터를 요청하고 redux store에 추가
   */
  const fetchMoreDonations = useCallback(() => {
    if (nextCursor) dispatch(getDonations({cursor: nextCursor, pageSize: 4}));
  }, [nextCursor, dispatch]);

  /**
   * 페이징 액션(Desktop) -> 터치 액션(Tablet, Mobile) 분기를 자연스럽게 하기 위해 첫 번째 데이터로 강제 이동
   */
  useEffect(() => setCurrentPage(0), [device]);

  useEffect(() => {
    dispatch(resetDonations());
    dispatch(getDonations({pageSize: 4}));
  }, [location.pathname, dispatch]);

  const totalPages = Math.ceil(list.length / 4);
  const displayedDonations = device === 'desktop' ? list.slice(currentPage * 4, (currentPage + 1) * 4) : list;
  return (
    <Pagination
      name="donation"
      title="응원을 기다리는 아티스트"
      device={device}
      cursor={nextCursor}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      fetchMoreData={fetchMoreDonations}
    >
      <SpreadCards lists={displayedDonations} device={device} fetchMoreDonations={fetchMoreDonations} />
    </Pagination>
  );
}

export default DonateArtist;
