import React, { useState } from "react";
import {
  modulo,
  getPrime,
  setPublicKey,
  setPrivateKey,
  isPrime,
} from "../utils/numbers";
import BigNumber from "bignumber.js";
import { isAlphabet, abcdef } from "../utils/alphabet";
import useHorebCipher from "./useHoreb";

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
  var padding = 0;

  const rsaConstructor = (
    rotationI: number,
    rotationII: number,
    rotationIII: number,
    rotationIV: number,
    rotationV: number
  ) => {
    primeP = getPrime(rotationI);
    primeQ = getPrime(rotationII + 1);
    product = primeP * primeQ;
    totient = (primeP - 1) * (primeQ - 1);
    publicKey = setPublicKey(totient);
    privateKey = setPrivateKey(publicKey, totient);
    padding = rotationIII;

    // primeP = 7;
    // primeQ = 19;
    // product = 133;
    // totient = 108;
    // publicKey = 29;
    // privateKey = 41;

    console.log("primeP", primeP);
    console.log("primeQ", primeQ);
    console.log("totient", totient);
    console.log("publicKey", publicKey);
    console.log("privateKey", privateKey);
    console.log("totient", totient);
    console.log("product", product);
  };

  const bigNumberProcess = (curr: string): string => {
    // (char ^ key) % product
    const idx =
      action === ACTIONS.ENCRYPT
        ? abcdef.indexOf(curr) : parseInt(curr);
    const bigIdx = new BigNumber(idx);

    console.log(idx);

    var bigKey =
      action === ACTIONS.ENCRYPT
        ? new BigNumber(privateKey)
        : new BigNumber(publicKey);

    console.log(
      "result",
      `(${bigIdx} ^ ${bigKey}) % ${product} = ${bigIdx.exponentiatedBy(bigKey).modulo(product).toNumber()}`
    );

    if (action === ACTIONS.ENCRYPT) {
      return bigIdx.exponentiatedBy(bigKey).modulo(product).toNumber().toString();
    } else {
      return abcdef[bigIdx.exponentiatedBy(bigKey).modulo(product).toNumber()];
    }
  };

  const rsa = (text: string): string => {

    // ab c
    // 1 2 X3
    // ab c 
    var result = "";

    if (action === ACTIONS.ENCRYPT) {
      const length = text.length;

      for (var textIdx = 0; textIdx < length; textIdx++) {
        var curr = text[textIdx];

        if (curr === ' ') {
          result = result.concat(abcdef[padding].toUpperCase());
        } else {
          if (isAlphabet(curr)) {
            result = result.concat(bigNumberProcess(curr));
          }
        }

        if (textIdx !== length - 1) {
          result = result.concat(' ');
        }
      }
    }

    if (action === ACTIONS.DECRYPT) {
      const length = text.split(' ').length;

      for (var textIdx = 0; textIdx < length; textIdx++) {
        var curr = text.split(' ')[textIdx];

        if (isAlphabet(curr)) {
          result = result.concat(' ');
        }

        if (!isAlphabet(curr)) {
          result = result.concat(bigNumberProcess(curr));
        }
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
