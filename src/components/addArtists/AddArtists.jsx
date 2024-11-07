import ProfileBadge from 'components/common/ProfileBadge';
import GradientButton from 'components/common/GradientButton';
import Pagination from 'components/donateArtist/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useRef, useState} from 'react';
import {addFavorite, getIdols, resetIdols} from 'services/apiSlice';
import useWindowSize from 'hooks/useWindowSize';
import parseImg from 'utils/images';
import {useLocation} from 'react-router-dom';

function AddArtists() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    idols: {list, nextCursor},
    myFavoriteArtists,
  } = useSelector(state => state.data);
  const [selectedIdols, setSelectedIdols] = useState([]); // 관심 등록된 아이돌 & 추가 할 아이돌을 위한 state
  const [currentPage, setCurrentPage] = useState(0); // 슬라이싱 된 배열의 페이징을 위한 state : 초기값 0
  const device = useWindowSize();
  const endRef = useRef(null); // Infinite Scroll 구현을 위한 Ref 객체

  /**
   * 아이돌 뱃지 클릭 이벤트 핸들러 : localStorage & store에 이미 저장된 경우 해제 불가 alert / 저장 안된 경우 선택 및 해제 가능
   * @param {*} idol store & localStorage에 업데이트 할 아이돌 데이터
   */
  const handleSelect = idol => {
    const isFavorite = myFavoriteArtists?.some(fav => fav.id === idol.id);
    const isSelected = selectedIdols.includes(idol);

    if (isFavorite) {
      alert('이미 선택된 아이돌입니다.');
      return;
    }

    setSelectedIdols(prev => (isSelected ? prev.filter(p => p.id !== idol.id) : [...prev, idol]));
  };

  /**
   * localStorage & store 에 추가할 아이돌이 있는 경우 추가
   */
  const handleAdd = () => {
    // store 데이터 중복 저장 방지 위해
    const favorites = selectedIdols.filter(idol => !myFavoriteArtists.some(fav => fav.id === idol.id));
    if (favorites.length < 1) {
      alert('아이돌을 선택해 주세요.');
      return;
    }
    dispatch(addFavorite(favorites));
  };

  /**
   * 서버에 데이터가 더 있는 경우 데이터를 요청하고 redux store에 추가
   */
  const fetchMoreIdols = useCallback(() => {
    if (nextCursor) dispatch(getIdols({cursor: nextCursor, pageSize: 16}));
  }, [nextCursor, dispatch]);

  /**
   * 감시 대상이 화면에 노출되면 서버에 데이터 요청
   */
  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) fetchMoreIdols();
    },
    [fetchMoreIdols],
  );

  /**
   * initial load
   */
  // useEffect(() => {
  //   dispatch(getIdols({pageSize: 16}));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(resetIdols());
    dispatch(getIdols({pageSize: 16}));
  }, [location.pathname, dispatch]);

  /**
   * store 데이터 변경 감지
   */
  useEffect(() => {
    setSelectedIdols([...myFavoriteArtists]);
  }, [myFavoriteArtists]);

  /**
   * IntersectionObserver API를 이용해 endRef 객체가 화면에 노출됨을 감지
   */
  useEffect(() => {
    if (device === 'desktop' || !endRef.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: endRef.current.parentNode,
      threshold: 1.0,
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [handleObserver, device]);

  /**
   * 페이징 액션(Desktop) -> 터치 액션(Tablet, Mobile) 분기를 자연스럽게 하기 위해 첫 번째 데이터로 강제 이동
   */
  useEffect(() => setCurrentPage(0), [device]);

  const totalPages = Math.ceil(list.length / 16);
  const displayedIdols = device === 'desktop' ? list.slice(currentPage * 16, (currentPage + 1) * 16) : list;
  const evenIdols = displayedIdols.filter((_, index) => index % 2 === 0);
  const oddIdols = displayedIdols.filter((_, index) => index % 2 !== 0);
  return (
    <>
      <Pagination
        name="favorite-list"
        title="관심있는 아이돌을 추가해보세요."
        device={device}
        cursor={nextCursor}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        fetchMoreData={fetchMoreIdols}
      >
        <div className="add-artists-wrap">
          <div className="add-artists-content">
            {[evenIdols, oddIdols].map((idols, idx) => (
              <div key={idx} className="add-artists-list">
                {idols.map(idol => (
                  <div key={idol.id} className="add-artists-container">
                    <ProfileBadge
                      src={idol.profilePicture}
                      size="large"
                      onClick={() => handleSelect(idol)}
                      selected={myFavoriteArtists.some(fav => fav.id === idol.id) || selectedIdols.some(sel => sel.id === idol.id)}
                    />
                    <div className="add-artists-text">
                      <div className="add-artists-name">{idol.name}</div>
                      <div className="add-artists-group">{idol.group}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {device !== 'desktop' && <div ref={endRef} className="end-point" />}
        </div>
      </Pagination>
      <GradientButton name="add-button" handleClick={handleAdd}>
        <img src={parseImg('ic_add_button.svg')} alt="추가하기" />
        추가하기
      </GradientButton>
    </>
  );
}

export default AddArtists;
