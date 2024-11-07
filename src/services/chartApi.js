import axios from 'axios';
import {endPoints} from 'constants/path';

export const fetchCharts = async ({gender = 'female', pageSize = 10, cursor} = {}) => {
  try {
    const queryParams = new URLSearchParams({gender, pageSize});
    if (cursor) queryParams.set('cursor', cursor);
    const res = await axios(`${endPoints.getCharts}/${gender}`, {params: queryParams});
    if (res.status === 200) {
      const sortIdols = res.data.idols.sort((a, b) => b.totalVotes - a.totalVotes);
      return {...res.data, idols: sortIdols};
    }
    throw new Error('차트 정보를 불러오지 못했습니다. 다시 시도해주세요.');
  } catch (e) {
    throw new Error('차트 정보를 불러오지 못했습니다. 다시 시도해주세요.');
  }
};

export const voteForIdol = async ({idolId}) => {
  const response = await axios.post(`${endPoints.updateVotes}`, {idolId: idolId});
  return response.data;
};
