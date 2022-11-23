const MAX = 200

export const isPrime = (number: number): boolean => {
    for (let idx = 2, s = Math.sqrt(number); idx <= s; idx++)
        if (number % idx === 0) return false;
    return number > 1;
}

export const getPrime = (number: number): number => {
    for (var idx = number - 1; idx > 0; idx--) {
        if (isPrime(idx)) {
            return idx;
        }
    }

    return 0;
}

export const modulo = (n: number, m: number): number => {
    return ((n % m) + m) % m;
};

export const isFactorOfNumber = (x: number, number: number): boolean => {
    if (modulo(x, number) === 0) {
        return true;
    }
    return false;
}

//   Function to set public key with respect to the ff. constraints
//   * Must be prime
//   * Must be less than totient
//   * Must not be a factor of the totient
export const setPublicKey = (totient: number): number => {
    for (var idx = 2; idx < totient; idx++) {
        console.log(idx, isPrime(idx), isFactorOfNumber(idx, totient))
        if (isPrime(idx) && !isFactorOfNumber(idx, totient)) {
            return idx;
        }
    }

    return 0;
}

//   Function to set private key with respect to the ff. constraints
//   * Product of private key and public key, divided by totient must result in a
//   remainder of 1
//   * (PRIVATE_KEY * PUBLIC_KEY) mod TOTIENT = 1
export const setPrivateKey = (publicKey: number, totient: number): number => {
    for (var idx = MAX; idx >= 0; idx--) {
        if (modulo(idx * publicKey, totient) === 1) {
            return idx;
        }
    }

    return 0;
}