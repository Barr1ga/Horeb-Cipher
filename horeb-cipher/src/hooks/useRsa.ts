import React, { useState } from "react";
import {
  modulo,
  getPrime,
  setPublicKey,
  setPrivateKey,
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

  const rsaConstructor = (
    rotationI: number,
    rotationII: number,
    rotationIII: number,
    rotationIV: number,
    rotationV: number
  ) => {
    primeP = getPrime(rotationI + rotationII + 26);
    primeQ = getPrime(rotationIII + rotationIV + 26);
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
    // (char ^ key) % product
    const idx = abcdef.indexOf(character);
    const bigIdx = new BigNumber(idx);

    var bigKey =
      action === ACTIONS.ENCRYPT
        ? new BigNumber(privateKey)
        : new BigNumber(publicKey);

    console.log(
      "result",
      `(${bigIdx} ^ ${bigKey}) % ${product} = ${modulo(
        bigIdx.exponentiatedBy(bigKey).modulo(product).toNumber(),
        26
      )}`
    );

    return abcdef[
      modulo(bigIdx.exponentiatedBy(bigKey).modulo(product).toNumber(), 26)
    ];
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
