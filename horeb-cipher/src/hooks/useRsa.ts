import React, { useState } from "react";
import { mod } from "../utils/mod";
import BigNumber from "bignumber.js";
import {
    isAlphabet,
    abcdef,
} from "../utils/alphabet";
import useHorebCipher from "./useHorebCipher"

const ACTIONS: {
    ENCRYPT: number;
    DECRYPT: number;
} = {
    ENCRYPT: 1,
    DECRYPT: 2,
};

const useRsa = () => {
    const {
        rotationI,
        rotationII,
        rotationIII,
        rotationIV,
        rotationV,
    } = useHorebCipher();
    var action = 0;
    const primeP = rotationI * rotationII;
    const primeQ = 2;
    const [publicKey, setpublicKey] = useState<number>(0);
    const [privateKey, setprivateKey] = useState<number>(0);
    const product = primeP * primeQ;
    const totient = (primeP - 1) * (primeQ - 1);


    const bigNumberProcess = (character: string): string => {
        // (char * key) % product
        const idx = abcdef.indexOf(character);
        const bigIdx = new BigNumber(idx);

        var bigKey = action === ACTIONS.ENCRYPT
            ? new BigNumber(privateKey)
            : new BigNumber(publicKey)

        const resultIdx = bigIdx.multipliedBy(bigKey).modulo(new BigNumber(product)).toNumber();
        return abcdef[resultIdx];
    }

    const rsa = (text: string): string => {
        var result = "";
        for (var textIdx = 0; textIdx < text.length; textIdx++) {
            const curr = text[textIdx];
            console.log(curr);

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
        setprimeP,
        setprimeQ,
        setpublicKey,
        setprivateKey,
    };
};

export default useRsa;
