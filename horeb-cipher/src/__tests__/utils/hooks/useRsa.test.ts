import { renderHook, act } from "@testing-library/react";
import useRsa from "../../../hooks/useRsa";

const removeAlphabeticCharacters = (str: string): string => {
  return str.replace(/[a-zA-Z]/g, "");
};

const defaultPrimeP = 0;
const defaultPrimeQ = 0;

const updatedPrimeP = 2;
const updatedPrimeQ = 7;

const plainText = "Hello World! My name is Horeb M. Barriga.";
const expectedCipherText = {
  defaultKey:
    "`123w108y132i132c27aKk`22b27o95j132w16r!aYt`12h41mAc52m0b12h108pHi83n112yHg`123f27k95x108a1kSd`12u.uHr`1h0j95h95o83b7k0y.",
  updatedKey:
    "`125z225y7m7m260dDw`105u260g289f7z29d!mWg`65n6xZl268m0v65b225iEc145u18yIj`125k260o289r225n1rTx`65k.mYv`1f0a289z289b145q112q0q.",
};

const expectedPlainText = "Hello World! My name is Horeb M. Barriga.";
const cipherText = {
  defaultKey:
    "`123w108y132i132c27aKk`22b27o95j132w16r!aYt`12h41mAc52m0b12h108pHi83n112yHg`123f27k95x108a1kSd`12u.uHr`1h0j95h95o83b7k0y.",
  updatedKey:
    "`125z225y7m7m260dDw`105u260g289f7z29d!mWg`65n6xZl268m0v65b225iEc145u18yIj`125k260o289r225n1rTx`65k.mYv`1f0a289z289b145q112q0q.",
};

// ENCRYPTION
describe("useRsa: Encryption with default keys", () => {
  test("should encrypt a single uppercase character with default keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa("A")).toBe("`0");
      expect(result.current.encryptRsa("V")).toBe("`109");
      expect(result.current.encryptRsa("F")).toBe("`125");
    });
  });

  test("should encrypt a single lowercase character with default keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa("f")).toBe("125");
      expect(result.current.encryptRsa("i")).toBe("83");
      expect(result.current.encryptRsa("p")).toBe("141");
    });
  });

  test("should encrypt a single symbol character with default keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa("#")).toBe("#");
      expect(result.current.encryptRsa("&")).toBe("&");
      expect(result.current.encryptRsa("$")).toBe("$");
      expect(result.current.encryptRsa("@")).toBe("@");
      expect(result.current.encryptRsa("(")).toBe("(");
      expect(result.current.encryptRsa(")")).toBe(")");
    });
  });

  test("should output a cipher text that is not equal to the original text", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa(plainText)).not.toEqual(plainText);
    });
  });

  test("should output a cipher text that outputs an expected value", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(
        removeAlphabeticCharacters(result.current.encryptRsa(plainText))
      ).toBe(removeAlphabeticCharacters(expectedCipherText.defaultKey));
    });
  });
});

describe("useRsa: Encryption with updated keys", () => {
  test("should encrypt a single uppercase character with updated keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa("A")).toBe("`0");
      expect(result.current.encryptRsa("V")).toBe("`72");
      expect(result.current.encryptRsa("F")).toBe("`139");
    });
  });

  test("should encrypt a single lowercase character with updated keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa("f")).toBe("139");
      expect(result.current.encryptRsa("i")).toBe("145");
      expect(result.current.encryptRsa("p")).toBe("155");
    });
  });

  test("should encrypt a single symbol character with updated keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa("#")).toBe("#");
      expect(result.current.encryptRsa("&")).toBe("&");
      expect(result.current.encryptRsa("$")).toBe("$");
      expect(result.current.encryptRsa("@")).toBe("@");
      expect(result.current.encryptRsa("(")).toBe("(");
      expect(result.current.encryptRsa(")")).toBe(")");
    });
  });

  test("should output a cipher text that is not equal to the original text", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.encryptRsa(plainText)).not.toEqual(plainText);
    });
  });

  test("should output a cipher text that outputs an expected value", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(
        removeAlphabeticCharacters(result.current.encryptRsa(plainText))
      ).toBe(removeAlphabeticCharacters(expectedCipherText.updatedKey));
    });
  });
});

// DECRYPTION
describe("useRsa: Decryption with default keys", () => {
  test("should decrypt a single uppercase character with default keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa("`0")).toBe("A");
      expect(result.current.decryptRsa("`109")).toBe("V");
      expect(result.current.decryptRsa("`125")).toBe("F");
    });
  });

  test("should decrypt a single lowercase character with default keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa("125")).toBe("f");
      expect(result.current.decryptRsa("83")).toBe("i");
      expect(result.current.decryptRsa("141")).toBe("p");
    });
  });

  test("should decrypt a single symbol character with default keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa("#")).toBe("#");
      expect(result.current.decryptRsa("&")).toBe("&");
      expect(result.current.decryptRsa("$")).toBe("$");
      expect(result.current.decryptRsa("@")).toBe("@");
      expect(result.current.decryptRsa("(")).toBe("(");
      expect(result.current.decryptRsa(")")).toBe(")");
    });
  });

  test("should output a cipher text that is not equal to the original text", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa(cipherText.defaultKey)).not.toEqual(
        cipherText.defaultKey
      );
    });
  });

  test("should output a cipher text that outputs an expected value", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(defaultPrimeP, defaultPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa(cipherText.defaultKey)).toBe(
        expectedPlainText
      );
    });
  });
});

// DECRYPTION
describe("useRsa: Decryption with updated keys", () => {
  test("should decrypt a single uppercase character with updated keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa("`0")).toBe("A");
      expect(result.current.decryptRsa("`72")).toBe("V");
      expect(result.current.decryptRsa("`139")).toBe("F");
    });
  });

  test("should decrypt a single lowercase character with updated keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa("139")).toBe("f");
      expect(result.current.decryptRsa("145")).toBe("i");
      expect(result.current.decryptRsa("155")).toBe("p");
    });
  });

  test("should decrypt a single symbol character with updated keys", () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa("#")).toBe("#");
      expect(result.current.decryptRsa("&")).toBe("&");
      expect(result.current.decryptRsa("$")).toBe("$");
      expect(result.current.decryptRsa("@")).toBe("@");
      expect(result.current.decryptRsa("(")).toBe("(");
      expect(result.current.decryptRsa(")")).toBe(")");
    });
  });

  test("should output a cipher text that is not equal to the original text", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa(cipherText.updatedKey)).not.toEqual(
        cipherText.updatedKey
      );
    });
  });

  test("should output a cipher text that outputs an expected value", async () => {
    const { result } = renderHook(useRsa);
    const { rsaConstructor } = result.current;

    act(() => {
      rsaConstructor(updatedPrimeP, updatedPrimeQ);
    });

    act(() => {
      expect(result.current.decryptRsa(cipherText.updatedKey)).toBe(
        expectedPlainText
      );
    });
  });
});
