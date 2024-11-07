import {useDispatch, useSelector} from 'react-redux';
import {removeFavorite} from 'services/apiSlice';
import ProfileDelete from 'components/common/ProfileDelete';
import Pagination from 'components/donateArtist/Pagination';
import useWindowSize from 'hooks/useWindowSize';
import {useEffect, useState} from 'react';

function FavoriteArtists() {
  const dispatch = useDispatch();
  const getArtists = useSelector(state => state.data.myFavoriteArtists);
  const [currentPage, setCurrentPage] = useState(0); // 슬라이싱 된 배열의 페이징을 위한 state : 초기값 0
  const device = useWindowSize();

  const handleDelete = id => () => {
    dispatch(removeFavorite(id));
  };

  /**
   * 페이징 액션(Desktop) -> 터치 액션(Tablet, Mobile) 분기를 자연스럽게 하기 위해 첫 번째 데이터로 강제 이동
   */
  useEffect(() => setCurrentPage(0), [device]);

  const totalPages = Math.ceil(getArtists?.length / 10);
  const displayedIdols = device === 'desktop' ? getArtists?.slice(currentPage * 10, (currentPage + 1) * 10) : getArtists;
  return (
    <Pagination
      name="entire-favorite-artist"
      title="내가 관심있는 아이돌"
      device={device}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    >
      <div className="favorite-artists-container">
        {displayedIdols.length > 0 ? (
          displayedIdols.map(artist => {
            return (
              <div key={`${artist.id}-artist`} className="favorite-artist">
                <>
                  <ProfileDelete key={`${artist.id}-delete`} src={artist.profilePicture} size="medium" onClick={handleDelete(artist.id)} />
                  <div key={`${artist.id}-info`} className="artist-info">
                    <div key={`${artist.id}-name`} className="artist-name">
                      {artist.name}
                    </div>
                    <div key={`${artist.id}-group`} className="artist-group">
                      {artist.group}
                    </div>
                  </div>
                </>
              </div>
            );
          })
        ) : (
          <div className="favorite-empty-text">관심있는 아이돌을 등록해주세요.</div>
        )}
      </div>
    </Pagination>
  );
}

export default FavoriteArtists;
