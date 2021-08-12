import API from './BasicRequest';
import {API_ABILITY} from './APIConstant';

const GetLatestComic = async (pageNo: number = 0): Promise<Array<any>> => {
  const latest = await API.GET(API_ABILITY.API_COMIC_LATEST, {pageNo}).catch(
    () => {
      return [];
    },
  );
  return latest;
};

const GetComicDetail = async (albumId: string): Promise<any> => {
  function sortBy(name: string, name_second: string) {
    const number = parseInt(name.split('.')[0], 10);
    const secondNum = parseInt(name_second.split('.')[0], 10);
    return number - secondNum;
  }
  const detail = await API.GET(API_ABILITY.API_COMIC_DETAIL, {
    id: albumId,
  })
    .then(res => {
      if (res && res.images) {
        res.images.sort(sortBy);
      }
      console.log('after sort', res);
      return res;
    })
    .catch(() => {
      return {};
    });
  console.log('comic detail', detail);
  return detail;
};

const GetComicChapter = async (series_id: string) => {
  const detail = await API.GET(API_ABILITY.API_COMIC_CHAPTER, {
    id: series_id,
  })
    .then(res => {
      console.log('get chapter', res);
      return res;
    })
    .catch(() => {
      return {};
    });
  console.log('comic detail', detail);
  return detail;
};

const getRandomComic = async () => {
  const random = await API.GET(API_ABILITY.API_COMIC_LATEST).catch(err => {
    console.error(err);
    return [];
  });
  return random;
};

export {GetLatestComic, GetComicDetail, GetComicChapter, getRandomComic};
