import React, { useState } from "react";
import {
  modulo,
  getPrime,
  setPublicKey,
  setPrivateKey,
} from "../utils/numbers";
import BigNumber from "bignumber.js";
import { isAlphabet, abcdef } from "../utils/alphabet";
import useHorebCipher from "./useHorebCipher";

const ACTIONS: {
  ENCRYPT: number;
  DECRYPT: number;
} = {
  ENCRYPT: 1,
  DECRYPT: 2,
};

const useRsa = () => {
  var action = 0;
  var primeP = 0;
  var primeQ = 0;
  var publicKey = 0;
  var privateKey = 0;
  var product = 0;
  var totient = 0;

  const rsaConstructor = (
    rotationI: number,
    rotationII: number,
    rotationIII: number,
    rotationIV: number,
    rotationV: number
  ) => {
    primeP = getPrime(rotationI + rotationII + 5);
    primeQ = getPrime(rotationIII + rotationIV + 5);
    product = primeP * primeQ;
    totient = (primeP - 1) * (primeQ - 1);
    console.log("totient", totient);
    console.log("publicKey", publicKey);
    console.log("privateKey", privateKey);
    publicKey = setPublicKey(totient);
    privateKey = setPrivateKey(publicKey, totient);
    console.log("privateKey", privateKey, "publicKey", publicKey);
    console.log("totient", totient);
    console.log("product", product);
  };

  const bigNumberProcess = (character: string): string => {
    // (char * key) % product
    const idx = abcdef.indexOf(character);
    console.log(idx);
    const bigIdx = new BigNumber(123);

    var bigKey =
      action === ACTIONS.ENCRYPT
        ? new BigNumber(privateKey)
        : new BigNumber(publicKey);

    bigIdx.multipliedBy(bigKey).modulo(20).toNumber();

    return character;
    // return abcdef[resultIdx];
  };

  const rsa = (text: string): string => {
    console.log(text);
    var result = "";
    for (var textIdx = 0; textIdx < text.length; textIdx++) {
      const curr = text[textIdx];
      console.log("curr", curr);

      if (isAlphabet(curr)) {
        const resultCharacter = bigNumberProcess(curr);
        result = result.concat(resultCharacter);
      } else {
        result = result.concat(curr);
      }
    }

    return result;
  };

  // run encryption
  const encryptRsa = (text: string): string => {
    action = ACTIONS.ENCRYPT;
    return rsa(text);
  };

  // run encryption
  const decryptRsa = (text: string): string => {
    action = ACTIONS.DECRYPT;
    return rsa(text);
  };

  return {
    encryptRsa,
    decryptRsa,
    rsa,
    rsaConstructor,
  };
};

export default useRsa;
