import AddArtists from 'components/addArtists/AddArtists';
import FavoriteArtists from 'components/favoriteArtists/FavoriteArtists';
import Nav from 'components/nav/Nav';
import React from 'react';

function MyPage() {
  return (
    <>
      <Nav />
      <FavoriteArtists title="내가 관심있는 아이돌" />
      <AddArtists title="관심 있는 아이돌을 추가해보세요." />
    </>
  );
}

export default MyPage;
