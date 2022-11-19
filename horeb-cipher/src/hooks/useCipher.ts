import React, { useState } from 'react'

const abcdef = "abcdefghijklmnopqrstuvwxyz";
const colemak = "qwfpgjluyarstdhneiozxcvbkm";
const azerty = "azertyuiopqsdfghjklmwxcvbn";
const qwerty = "qwertyuiopasdfghjklzxcvbnm";
const dvorak = "pyfgcrlaoeuidhtnsqjkxbmwvz";
const MAX_ALPHABET = 26;
const HALF_ALPHABET = MAX_ALPHABET / 2;

const isAlphabet = (character: string): boolean => {
    if (!/[^a-zA-Z]/.test(character)) {
        return true;
    }

    return false;
};

const ACTIONS: {
    ENCRYPT: number,
    DECRYPT: number,
} = {
    ENCRYPT: 1,
    DECRYPT: 2,
}

const useCipher = () => {
    var action = 0;
    const [rotationI, setRotationI] = useState<number>(3);
    const [rotationII, setRotationII] = useState<number>(8);
    const [rotationIII, setRotationIII] = useState<number>(4);
    const [rotationIV, setRotationIV] = useState<number>(19);
    const [rotationV, setRotationV] = useState<number>(10);

    const setKey = (key: string): void => {
        
    }

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
        const rotorIChar = action === ACTIONS.ENCRYPT ? abcdef[(idx + rotationI) % MAX_ALPHABET] : abcdef[(idx - rotationI) % MAX_ALPHABET];
        console.log(rotorIChar);

        // return
        const rotorIIChar = rotorII(rotorIChar);
        const rotorIICharIdx = abcdef.indexOf(rotorIIChar);
        const returnRotorIChar = action === ACTIONS.ENCRYPT ?
            abcdef[(rotorIICharIdx + rotationI) % MAX_ALPHABET] : abcdef[(rotorIICharIdx - rotationI) % MAX_ALPHABET];
        console.log(returnRotorIChar);

        return formatCharacter(returnRotorIChar);
    };

    const rotorII = (character: string): string => {
        const idx = colemak.indexOf(character.toLowerCase());
        const rotorIIChar = action === ACTIONS.ENCRYPT ? colemak[(idx + rotationII) % MAX_ALPHABET] : colemak[(idx - rotationII) % MAX_ALPHABET];
        console.log(rotorIIChar);

        // return
        const rotorIIIChar = rotorIII(rotorIIChar);
        const rotorIIICharIdx = colemak.indexOf(rotorIIIChar);
        const returnRotorIIChar = action === ACTIONS.ENCRYPT ?
            colemak[(rotorIIICharIdx + rotationII) % MAX_ALPHABET] : colemak[(rotorIIICharIdx - rotationII) % MAX_ALPHABET];
        console.log(returnRotorIIChar);
        return returnRotorIIChar;
    };

    const rotorIII = (character: string): string => {
        const idx = azerty.indexOf(character.toLowerCase());
        const rotorIIIChar = action === ACTIONS.ENCRYPT ? azerty[(idx + rotationIII) % MAX_ALPHABET] : azerty[(idx - rotationIII) % MAX_ALPHABET];
        console.log(rotorIIIChar);

        // return
        const rotorIVChar = rotorIV(rotorIIIChar);
        const rotorIVCharIdx = azerty.indexOf(rotorIVChar);
        const returnRotorIIIChar = action === ACTIONS.ENCRYPT ?
            azerty[(rotorIVCharIdx + rotationIII) % MAX_ALPHABET] : azerty[(rotorIVCharIdx - rotationIII) % MAX_ALPHABET];
        console.log(returnRotorIIIChar);
        return returnRotorIIIChar;
    };

    const rotorIV = (character: string): string => {
        const idx = qwerty.indexOf(character.toLowerCase());
        const rotorIVChar = action === ACTIONS.ENCRYPT ? qwerty[(idx + rotationIV) % MAX_ALPHABET] : qwerty[(idx - rotationIV) % MAX_ALPHABET];
        console.log(rotorIVChar);

        // return
        const rotorVChar = rotorV(rotorIVChar);
        const rotorVCharIdx = qwerty.indexOf(rotorVChar);
        const returnRotorIVChar = action === ACTIONS.ENCRYPT ?
            qwerty[(rotorVCharIdx + rotationIV) % MAX_ALPHABET] : qwerty[(rotorVCharIdx - rotationIV) % MAX_ALPHABET];
        console.log(returnRotorIVChar);
        return returnRotorIVChar;
    };

    const rotorV = (character: string): string => {
        var idx = dvorak.indexOf(character.toLowerCase());
        const rotorVChar = action === ACTIONS.ENCRYPT ? dvorak[(idx + rotationV) % MAX_ALPHABET] : dvorak[(idx - rotationV) % MAX_ALPHABET];
        console.log(rotorVChar);

        // return
        console.log("second pass");
        idx = dvorak.indexOf(rotorVChar.toLowerCase());
        idx = action === ACTIONS.ENCRYPT ? (idx + HALF_ALPHABET) % MAX_ALPHABET : (idx - HALF_ALPHABET) % MAX_ALPHABET;
        const returnRotorVChar = action === ACTIONS.ENCRYPT ? dvorak[(idx + rotationV) % MAX_ALPHABET] : dvorak[(idx - rotationV) % MAX_ALPHABET];
        console.log(returnRotorVChar);
        return returnRotorVChar;
    };

    const horebCipher = (text: string): string => {
        var tempCipherText = "";
        for (var textIdx = 0; textIdx < text.length; textIdx++) {
            const curr = text[textIdx];

            if (isAlphabet(curr)) {
                const cipherCharacter = rotorI(curr);
                tempCipherText = tempCipherText.concat(cipherCharacter);
                console.log(curr);
            } else {
                tempCipherText = tempCipherText.concat(curr);
            }
        }

        return tempCipherText;
    }

    // run encryption
    const encrypt = (text: string): string => {
        action = ACTIONS.ENCRYPT;
        return horebCipher(text);
    };

    // run encryption
    const decrypt = (text: string): string => {
        action = ACTIONS.DECRYPT;
        return horebCipher(text);
    };

    return {
        encrypt,
        decrypt,
    }
}

export default useCipher