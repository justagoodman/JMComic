import {API_VERSION} from './APIConstant';
const CryptoJS = require('crypto-js');

export const magic = '1614446604';

export const version = API_VERSION;

const salt = '18comicAPP';

export function randomMagic() {
  let o = new Date();
  let f = new Date(o.toUTCString());
  return Math.floor(f.getTime() / 1e3);
}

export function encodeKey(key) {
  console.log(CryptoJS.MD5(key).toString())
  return CryptoJS.MD5(key).toString()
}

export default function getToken() {
  const TokenParam = magic + ',' + version;
  const token = encodeKey(magic + salt);
  console.log(TokenParam);
  return {Tokenparam: TokenParam, Token: token};
}
