export const abcdef = "abcdefghijklmnopqrstuvwxyz";
export const colemak = "qwfpgjluyarstdhneiozxcvbkm";
export const azerty = "azertyuiopqsdfghjklmwxcvbn";
export const qwerty = "qwertyuiopasdfghjklzxcvbnm";
export const dvorak = "pyfgcrlaoeuidhtnsqjkxbmwvz";
export const MAX_ALPHABET = 26;
export const HALF_ALPHABET = MAX_ALPHABET / 2;

export const isAlphabet = (character: string): boolean => {
    if (!/[^a-zA-Z]/.test(character)) {
        return true;
    }

    return false;
};