import encrypt_key from './encrypt_key';

const CryptoJS = require('crypto-js');

import {magic} from './encoder';

export const salt = '18comicAPPContent';

export default function decode(encrypted) {
  let data;
  try {
    let key = encrypt_key(magic + salt);
    console.log(key);
    let vector = CryptoJS.enc.Utf8.parse(key);
    console.log(vector);
    let decoded_data = CryptoJS.AES.decrypt(encrypted, vector, {
      mode: CryptoJS.mode.ECB,
    });
    console.log(decoded_data);
    data = JSON.parse(decoded_data.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    throw e;
  }
  return data;
}
