import getTokenHeader from './encoder';
import decode from './decoder';
import {API_VERSION, BASE_CDN_YD_URL} from './APIConstant';

export const getAlbumPostUrl = (albumId: string): string => {
  return `${BASE_CDN_YD_URL}/media/albums/${albumId}_3x4.jpg`;
};

export const getPhotoUrl = (albumId: string, photoId: string) => {
  return `${BASE_CDN_YD_URL}/media/photos/${albumId}/${photoId}`;
};

export interface I_API {
  // match official app version
  app_version: string;

  GET(url: string, query?: object, config?: RequestInit): Promise<any>;

  POST(url: string, query?: object, config?: RequestInit): Promise<any>;
}

export class API implements I_API {
  app_version: string = API_VERSION;

  GET(url: string, query?: object, config?: RequestInit): Promise<any> {
    let queryParams = '';
    if (query) {
      queryParams += '?key=0b931a6f4b5ccc3f8d870839d07ae7b2';
      for (const key in query) {
        // @ts-ignore
        queryParams += '&' + key + '=' + encodeURIComponent(query[key]);
      }
    }
    url += queryParams;
    const headerToken = getTokenHeader() as {Tokenparam: string; Token: string};
    const staticConfig = {
      credentials: 'include',
      headers: headerToken,
    } as RequestInit;
    const requestConfig = {...staticConfig, ...(config ? config : {})};
    return fetch(url, requestConfig)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log('get data from api', data);
        let decode_data = decode(data.data);
        return decode_data;
      })
      .catch((e) => {
        console.error(e);
        // err handler
      });
  }

  POST(url: string, query?: object, config?: RequestInit): Promise<any> {
    let queryParams = '';
    if (query) {
      for (let key in query) {
        // @ts-ignore
        queryParams += key + '=' + encodeURIComponent(query[key]) + '&';
      }
    }
    queryParams = queryParams.slice(0, -1);
    const headers = getTokenHeader() as {
      Tokenparam: string;
      Token: string;
      'Content-Type': string;
    };
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const staticConfig = {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: queryParams + 'key=0b931a6f4b5ccc3f8d870839d07ae7b2',
    } as RequestInit;
    const requestConfig = {...staticConfig, ...(config ? config : {})};
    return fetch(url, requestConfig)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let decode_data = decode(data);
        return decode_data;
      })
      .catch((e) => {
        console.error(e);
        // err handler
      });
  }
}

export default new API();
