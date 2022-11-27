export const abcdef = "abcdefghijklmnopqrstuvwxyz";
export const colemak = "qwfpgjluyarstdhneiozxcvbkm";
export const azerty = "azertyuiopqsdfghjklmwxcvbn";
export const qwerty = "qwertyuiopasdfghjklzxcvbnm";
export const dvorak = "pyfgcrlaoeuidhtnsqjkxbmwvz";
export const MAX_ALPHABET = 26;
export const MAX_ALPHABET_IDX = MAX_ALPHABET - 1;
export const HALF_ALPHABET = MAX_ALPHABET / 2;

export const isNumeric = (character: string): boolean => {
  if (/^\d+$/.test(character)) {
    return true;
  }

  return false;
};

export const isAlphabet = (character: string): boolean => {
  if (!/[^a-zA-Z]/.test(character)) {
    return true;
  }

  return false;
};

export const isUpperCase = (character: string): boolean => {
  if (/^[A-Z]*$/.test(character)) {
    return true;
  }

  return false;
};

export const isSpecialCharacter = (character: string): boolean => {
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(character)) {
    return true;
  }

  return false;
};
