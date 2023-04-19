import {
  getPrime,
  isFactorOfNumber,
  isPrime,
  modulo,
  randomIntFromInterval,
  setPrivateKey,
  setPublicKey,
} from "../../utils/numbers";

describe("isPrime", () => {
  test("should return true for prime number", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(23)).toBe(true);
    expect(isPrime(101)).toBe(true);
    expect(isPrime(997)).toBe(true);
  });

  test("should return false for non-prime number", () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(12)).toBe(false);
    expect(isPrime(15)).toBe(false);
    expect(isPrime(100)).toBe(false);
    expect(isPrime(999)).toBe(false);
  });
});

describe("getPrime", () => {
  test("should return the nth prime number", () => {
    expect(getPrime(1)).toBe(13);
    expect(getPrime(2)).toBe(17);
    expect(getPrime(5)).toBe(11);
    expect(getPrime(10)).toBe(29);
    expect(getPrime(50)).toBe(229);
    expect(getPrime(100)).toBe(541);
  });
});

describe("modulo", () => {
  test("should return the correct value", () => {
    expect(modulo(5, 2)).toBe(1);
    expect(modulo(-5, 2)).toBe(1);
    expect(modulo(7, 3)).toBe(1);
    expect(modulo(-7, 3)).toBe(2);
    expect(modulo(10, 5)).toBe(0);
    expect(modulo(-10, 5)).toBe(0);
    expect(modulo(15, 7)).toBe(1);
    expect(modulo(-15, 7)).toBe(6);
  });
});

describe("isFactorOfNumber", () => {
  test("should return true for factor of number", () => {
    expect(isFactorOfNumber(10, 2)).toBe(true);
    expect(isFactorOfNumber(15, 5)).toBe(true);
    expect(isFactorOfNumber(9, 3)).toBe(true);
    expect(isFactorOfNumber(30, 6)).toBe(true);
    expect(isFactorOfNumber(100, 10)).toBe(true);
  });

  test("should return false for non-factor of number", () => {
    expect(isFactorOfNumber(3, 10)).toBe(false);
    expect(isFactorOfNumber(4, 15)).toBe(false);
    expect(isFactorOfNumber(7, 9)).toBe(false);
    expect(isFactorOfNumber(11, 30)).toBe(false);
    expect(isFactorOfNumber(20, 100)).toBe(false);
  });
});

describe("setPublicKey", () => {
  it("should return the correct public key", () => {
    expect(setPublicKey(120)).toBe(7);
  });
});

describe("setPrivateKey", () => {
  it("should return the correct private key", () => {
    const publicKey = 11;
    const totient = 120;
    const expectedPrivateKey = 11;

    expect(setPrivateKey(publicKey, totient)).toBe(expectedPrivateKey);
  });
});

describe("randomIntFromInterval", () => {
  it("should return a random integer within the given range", () => {
    const min = 10;
    const max = 20;
    const randomInt = randomIntFromInterval(min, max);

    expect(randomInt).toBeGreaterThanOrEqual(min);
    expect(randomInt).toBeLessThanOrEqual(max);
  });

  it("should return the correct integer when given the same min and max values", () => {
    expect(randomIntFromInterval(5, 5)).toBe(5);
  });
});
