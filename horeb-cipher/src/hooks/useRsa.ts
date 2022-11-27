import { isNumeric } from "./../utils/alphabet";
import React, { useState } from "react";
import {
  modulo,
  getPrime,
  setPublicKey,
  setPrivateKey,
  randomIntFromInterval,
  isPrime,
} from "../utils/numbers";
import BigNumber from "bignumber.js";
import {
  isAlphabet,
  abcdef,
  azerty,
  isUpperCase,
  isSpecialCharacter,
  MAX_ALPHABET_IDX,
} from "../utils/alphabet";

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
    primeP = getPrime(rotationI);
    primeQ = getPrime(rotationII + 1);
    product = primeP * primeQ;
    totient = (primeP - 1) * (primeQ - 1);
    publicKey = setPublicKey(totient);
    privateKey = setPrivateKey(publicKey, totient);
  };

  const bigNumberProcess = (curr: string): string => {
    // (char ^ key) % product
    const idx =
      action === ACTIONS.ENCRYPT
        ? abcdef.indexOf(curr.toLowerCase())
        : parseInt(curr);
    const bigIdx = new BigNumber(idx);
    var bigKey =
      action === ACTIONS.ENCRYPT
        ? new BigNumber(privateKey)
        : new BigNumber(publicKey);

    if (action === ACTIONS.ENCRYPT) {
      return bigIdx
        .exponentiatedBy(bigKey)
        .modulo(product)
        .toNumber()
        .toString();
    } else {
      return abcdef[bigIdx.exponentiatedBy(bigKey).modulo(product).toNumber()];
    }
  };

  // run encryption
  const encryptRsa = (text: string): string => {
    action = ACTIONS.ENCRYPT;
    var result = "";
    const length = text.length;

    for (var textIdx = 0; textIdx < length; textIdx++) {
      var curr = text[textIdx];

      // if current is a uppercase, concat ` at the start of the rsa result
      if (curr === "\n") {
        result = result.concat("\n");
      } else {
        if (isAlphabet(curr)) {
          if (isUpperCase(curr)) {
            result = result.concat("`");
          }

          // calculate rsa value of current character
          result = result.concat(bigNumberProcess(curr));

          // if current is a number, concat ~ at the start of the number
        } else if (isNumeric(curr)) {
          result = result.concat("~");
          var number = "";
          // e 12
          do {
            number = number.concat(text[textIdx]);
            textIdx++;
          } while (textIdx < length && isNumeric(text[textIdx]));
          textIdx--;

          result = result.concat(number);

          // if current is a space, concat some random uppercase character into the result
        } else if (curr === " " && !isSpecialCharacter(curr)) {
          result = result.concat(
            azerty[randomIntFromInterval(0, MAX_ALPHABET_IDX)].toUpperCase()
          );

          // if current is some other character, direct copy and concat into the result
        } else {
          result = result.concat(curr);
        }

        if (text[textIdx + 1] !== "\n" && textIdx < length - 1) {
          result = result.concat(
            azerty[randomIntFromInterval(0, MAX_ALPHABET_IDX)].toLowerCase()
          );
        }
      }
    }

    return result;
  };

  // run encryption
  const decryptRsa = (text: string): string => {
    action = ACTIONS.DECRYPT;

    var result = "";
    text = text.replaceAll("\n", " \n ").replaceAll(/[a-z]/g, " ");

    const length = text.split(" ").length;

    for (var textIdx = 0; textIdx < length; textIdx++) {
      var curr = text.split(" ")[textIdx];

      // if current is a uppercase character, concat space character into the result
      if (curr === "\n") {
        result = result.concat("\n");
      } else {
        if (isAlphabet(curr) && isUpperCase(curr)) {
          result = result.concat(" ");

          // if current starts with ~, direct copy as it is a number
        } else if (curr.startsWith("~")) {
          result = result.concat(curr.slice(1));

          // if current is a special character, direct copy and concat into the result
        } else if (isSpecialCharacter(curr)) {
          result = result.concat(curr);

          // if current current is a number, calculate rsa value and display appropriate character
        } else if (curr.startsWith("`")) {
          result = result.concat(bigNumberProcess(curr.slice(1)).toUpperCase());
        } else {
          result = result.concat(bigNumberProcess(curr));
        }
      }
    }

    return result;
  };

  return {
    encryptRsa,
    decryptRsa,
    rsaConstructor,
  };
};

export default useRsa;
