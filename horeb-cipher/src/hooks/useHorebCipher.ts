import React, { useState } from "react";
import { mod } from "../utils/mod";
import {
  abcdef,
  colemak,
  azerty,
  qwerty,
  dvorak,
  MAX_ALPHABET,
  HALF_ALPHABET,
  isAlphabet,
} from "../utils/alphabet";

const ACTIONS: {
  ENCRYPT: number;
  DECRYPT: number;
} = {
  ENCRYPT: 1,
  DECRYPT: 2,
};

const useCipher = () => {
  var action = 0;
  const [rotationI, setRotationI] = useState<number>(0);
  const [rotationII, setRotationII] = useState<number>(0);
  const [rotationIII, setRotationIII] = useState<number>(0);
  const [rotationIV, setRotationIV] = useState<number>(0);
  const [rotationV, setRotationV] = useState<number>(0);

  const formatCharacter = (character: string): string => {
    if (character === character.toUpperCase()) {
      return character.toUpperCase();
    }
    if (character === character.toLowerCase()) {
      return character.toLowerCase();
    }

    return character;
  };

  const rotorI = (character: string): string => {
    const idx = abcdef.indexOf(character.toLowerCase());
    const rotorIChar =
      action === ACTIONS.ENCRYPT
        ? abcdef[mod(idx + rotationI, MAX_ALPHABET)]
        : abcdef[mod(idx - rotationI, MAX_ALPHABET)];

    // return
    const rotorIIChar = rotorII(rotorIChar);
    const rotorIICharIdx = abcdef.indexOf(rotorIIChar);
    const returnRotorIChar =
      action === ACTIONS.ENCRYPT
        ? abcdef[mod(rotorIICharIdx + rotationI, MAX_ALPHABET)]
        : abcdef[mod(rotorIICharIdx - rotationI, MAX_ALPHABET)];
    // console.log(returnRotorIChar);

    return formatCharacter(returnRotorIChar);
  };

  const rotorII = (character: string): string => {
    const idx = colemak.indexOf(character.toLowerCase());
    console.log(idx);
    const rotorIIChar =
      action === ACTIONS.ENCRYPT
        ? colemak[mod(idx + rotationII, MAX_ALPHABET)]
        : colemak[mod(idx - rotationII, MAX_ALPHABET)];
    console.log((idx - rotationII) % MAX_ALPHABET);
    console.log(colemak[(idx - rotationII) % MAX_ALPHABET]);
    console.log(rotorIIChar);

    // return
    const rotorIIIChar = rotorIII(rotorIIChar);
    const rotorIIICharIdx = colemak.indexOf(rotorIIIChar);
    const returnRotorIIChar =
      action === ACTIONS.ENCRYPT
        ? colemak[mod(rotorIIICharIdx + rotationII, MAX_ALPHABET)]
        : colemak[mod(rotorIIICharIdx - rotationII, MAX_ALPHABET)];
    // console.log(returnRotorIIChar);
    return returnRotorIIChar;
  };

  const rotorIII = (character: string): string => {
    console.log(character);
    const idx = azerty.indexOf(character.toLowerCase());
    const rotorIIIChar =
      action === ACTIONS.ENCRYPT
        ? azerty[mod(idx + rotationIII, MAX_ALPHABET)]
        : azerty[mod(idx - rotationIII, MAX_ALPHABET)];
    console.log(rotorIIIChar);

    // return
    const rotorIVChar = rotorIV(rotorIIIChar);
    const rotorIVCharIdx = azerty.indexOf(rotorIVChar);
    const returnRotorIIIChar =
      action === ACTIONS.ENCRYPT
        ? azerty[mod(rotorIVCharIdx + rotationIII, MAX_ALPHABET)]
        : azerty[mod(rotorIVCharIdx - rotationIII, MAX_ALPHABET)];
    // console.log(returnRotorIIIChar);
    return returnRotorIIIChar;
  };

  const rotorIV = (character: string): string => {
    const idx = qwerty.indexOf(character.toLowerCase());
    const rotorIVChar =
      action === ACTIONS.ENCRYPT
        ? qwerty[mod(idx + rotationIV, MAX_ALPHABET)]
        : qwerty[mod(idx - rotationIV, MAX_ALPHABET)];
    // console.log(rotorIVChar);

    // return
    const rotorVChar = rotorV(rotorIVChar);
    const rotorVCharIdx = qwerty.indexOf(rotorVChar);
    const returnRotorIVChar =
      action === ACTIONS.ENCRYPT
        ? qwerty[mod(rotorVCharIdx + rotationIV, MAX_ALPHABET)]
        : qwerty[mod(rotorVCharIdx - rotationIV, MAX_ALPHABET)];
    // console.log(returnRotorIVChar);
    return returnRotorIVChar;
  };

  const rotorV = (character: string): string => {
    var idx = dvorak.indexOf(character.toLowerCase());
    const rotorVChar =
      action === ACTIONS.ENCRYPT
        ? dvorak[mod(idx + rotationV, MAX_ALPHABET)]
        : dvorak[mod(idx - rotationV, MAX_ALPHABET)];
    // console.log(rotorVChar);

    // return
    console.log("second pass");
    idx = dvorak.indexOf(rotorVChar.toLowerCase());
    idx =
      action === ACTIONS.ENCRYPT
        ? mod(idx + HALF_ALPHABET, MAX_ALPHABET)
        : mod(idx - HALF_ALPHABET, MAX_ALPHABET);
    const returnRotorVChar =
      action === ACTIONS.ENCRYPT
        ? dvorak[mod(idx + rotationV, MAX_ALPHABET)]
        : dvorak[mod(idx - rotationV, MAX_ALPHABET)];
    // console.log(returnRotorVChar);
    return returnRotorVChar;
  };

  const horebCipher = (text: string): string => {
    var result = "";
    for (var textIdx = 0; textIdx < text.length; textIdx++) {
      const curr = text[textIdx];
      console.log(curr);

      if (isAlphabet(curr)) {
        const resultCharacter = rotorI(curr);
        result = result.concat(resultCharacter);
      } else {
        result = result.concat(curr);
      }
    }

    return result;
  };

  // run encryption
  const encryptHoreb = (text: string): string => {
    action = ACTIONS.ENCRYPT;
    console.log(action);
    return horebCipher(text);
  };

  // run encryption
  const decryptHoreb = (text: string): string => {
    console.log(text);
    action = ACTIONS.DECRYPT;
    console.log(action);

    return horebCipher(text);
  };

  return {
    encryptHoreb,
    decryptHoreb,
    rotationI,
    rotationII,
    rotationIII,
    rotationIV,
    rotationV,
    setRotationI,
    setRotationII,
    setRotationIII,
    setRotationIV,
    setRotationV,
  };
};

export default useCipher;
