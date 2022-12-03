import React, { useState } from "react";
import { modulo } from "../utils/numbers";
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
import useRsa from "./useRsa";

const ACTIONS: {
  ENCRYPT: number;
  DECRYPT: number;
} = {
  ENCRYPT: 1,
  DECRYPT: 2,
};

const useHoreb = () => {
  var action = 0;
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [rotationI, setRotationI] = useState<number>(0);
  const [rotationII, setRotationII] = useState<number>(0);
  const [rotationIII, setRotationIII] = useState<number>(0);
  const [rotationIV, setRotationIV] = useState<number>(0);
  const [rotationV, setRotationV] = useState<number>(0);

  const { encryptRsa, decryptRsa, rsaConstructor } = useRsa();

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
        ? abcdef[modulo(idx + rotationI, MAX_ALPHABET)]
        : abcdef[modulo(idx - rotationI, MAX_ALPHABET)];

    // return
    const rotorIIChar = rotorII(rotorIChar);
    const rotorIICharIdx = abcdef.indexOf(rotorIIChar);
    const returnRotorIChar =
      action === ACTIONS.ENCRYPT
        ? abcdef[modulo(rotorIICharIdx + rotationI, MAX_ALPHABET)]
        : abcdef[modulo(rotorIICharIdx - rotationI, MAX_ALPHABET)];

    return formatCharacter(returnRotorIChar);
  };

  const rotorII = (character: string): string => {
    const idx = colemak.indexOf(character.toLowerCase());
    const rotorIIChar =
      action === ACTIONS.ENCRYPT
        ? colemak[modulo(idx + rotationII, MAX_ALPHABET)]
        : colemak[modulo(idx - rotationII, MAX_ALPHABET)];

    // return
    const rotorIIIChar = rotorIII(rotorIIChar);
    const rotorIIICharIdx = colemak.indexOf(rotorIIIChar);
    const returnRotorIIChar =
      action === ACTIONS.ENCRYPT
        ? colemak[modulo(rotorIIICharIdx + rotationII, MAX_ALPHABET)]
        : colemak[modulo(rotorIIICharIdx - rotationII, MAX_ALPHABET)];
    return returnRotorIIChar;
  };

  const rotorIII = (character: string): string => {
    const idx = azerty.indexOf(character.toLowerCase());
    const rotorIIIChar =
      action === ACTIONS.ENCRYPT
        ? azerty[modulo(idx + rotationIII, MAX_ALPHABET)]
        : azerty[modulo(idx - rotationIII, MAX_ALPHABET)];

    // return
    const rotorIVChar = rotorIV(rotorIIIChar);
    const rotorIVCharIdx = azerty.indexOf(rotorIVChar);
    const returnRotorIIIChar =
      action === ACTIONS.ENCRYPT
        ? azerty[modulo(rotorIVCharIdx + rotationIII, MAX_ALPHABET)]
        : azerty[modulo(rotorIVCharIdx - rotationIII, MAX_ALPHABET)];
    return returnRotorIIIChar;
  };

  const rotorIV = (character: string): string => {
    const idx = qwerty.indexOf(character.toLowerCase());
    const rotorIVChar =
      action === ACTIONS.ENCRYPT
        ? qwerty[modulo(idx + rotationIV, MAX_ALPHABET)]
        : qwerty[modulo(idx - rotationIV, MAX_ALPHABET)];

    // return
    const rotorVChar = rotorV(rotorIVChar);
    const rotorVCharIdx = qwerty.indexOf(rotorVChar);
    const returnRotorIVChar =
      action === ACTIONS.ENCRYPT
        ? qwerty[modulo(rotorVCharIdx + rotationIV, MAX_ALPHABET)]
        : qwerty[modulo(rotorVCharIdx - rotationIV, MAX_ALPHABET)];
    return returnRotorIVChar;
  };

  const rotorV = (character: string): string => {
    var idx = dvorak.indexOf(character.toLowerCase());
    const rotorVChar =
      action === ACTIONS.ENCRYPT
        ? dvorak[modulo(idx + rotationV, MAX_ALPHABET)]
        : dvorak[modulo(idx - rotationV, MAX_ALPHABET)];

    // return
    idx = dvorak.indexOf(rotorVChar.toLowerCase());
    idx =
      action === ACTIONS.ENCRYPT
        ? modulo(idx + HALF_ALPHABET, MAX_ALPHABET)
        : modulo(idx - HALF_ALPHABET, MAX_ALPHABET);
    const returnRotorVChar =
      action === ACTIONS.ENCRYPT
        ? dvorak[modulo(idx + rotationV, MAX_ALPHABET)]
        : dvorak[modulo(idx - rotationV, MAX_ALPHABET)];
    return returnRotorVChar;
  };

  // run encryption
  const encryptHoreb = (text: string): string => {
    action = ACTIONS.ENCRYPT;

    setIsVerified(false);
    setIsError(false);

    console.log(rotationI);
    console.log(rotationII);
    console.log(rotationIII);
    console.log(rotationIV);
    console.log(rotationV);
    rsaConstructor(rotationI, rotationII, rotationIII, rotationIV, rotationV);

    const result = encryptRsa(text);

    if (
      result.includes("undefined") ||
      result.replaceAll(" ", "").length === 0
    ) {
      setIsError(true);
      return "Encryption Error";
    }

    setIsVerified(true);
    return result;
  };

  // run encryption
  const decryptHoreb = (text: string): string => {
    action = ACTIONS.DECRYPT;
    rsaConstructor(rotationI, rotationII, rotationIII, rotationIV, rotationV);

    setIsVerified(false);
    setIsError(false);

    const result = decryptRsa(text);

    if (
      result.includes("undefined") ||
      result.replaceAll(" ", "").length === 0
    ) {
      setIsError(true);
      return "Decryption Error";
    }

    setIsVerified(true);
    return result;
  };

  return {
    isError,
    setIsError,
    isVerified,
    setIsVerified,
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

export default useHoreb;
