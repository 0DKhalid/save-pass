/* eslint-disable new-cap */
import aesjs from 'aes-js';

export const encrypt = (hexKey, plainText) => {
  const key = aesjs.utils.hex.toBytes(hexKey);
  const textToBytes = aesjs.utils.utf8.toBytes(plainText);

  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textToBytes);

  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
};

export const decrypt = (hexKey, cipherText) => {
  const key = aesjs.utils.hex.toBytes(hexKey);
  const hexToBytes = aesjs.utils.hex.toBytes(cipherText);

  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(hexToBytes);

  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

  return decryptedText;
};
