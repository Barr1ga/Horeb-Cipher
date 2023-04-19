import { renderHook, act, waitFor } from "@testing-library/react";
import useHoreb from "../../../hooks/useHoreb";

const removeAlphabeticCharacters = (str: string): string => {
  return str.replace(/[a-zA-Z]/g, "");
};

const plainText = "Hello World! My name is Horeb M. Barriga.";
const cipherText = {
  defaultKey:
    "`141c12d10b10l1jQk`58o1t113s10z38n!rVt`108c72yGa125v23e108g12tXr109a7pBb`141h1i113s12z27hBz`108r.iCk`27e23i113z113i109h112m23c.",
  updatedKey:
    "`65s267n260w260n105rBl`145q105i289n260z6e!sMq`139w112lNi147u7z139u267uHh264u125mWu`65u105w289x267q237mNu`139a.hYk`237a7d289e289g264u282l7v.",
};

// ENCRYPTION
describe("useHoreb: Encryption with default keys", () => {
  test("should encrypt a single uppercase character with default keys", () => {
    const { result } = renderHook(useHoreb);
    const { encryptHoreb } = result.current;

    act(() => {
      expect(encryptHoreb("A")).toBe("`23");
      expect(encryptHoreb("V")).toBe("`83");
      expect(encryptHoreb("F")).toBe("`52");
    });
  });

  test("should encrypt a single lowercase character with default keys", () => {
    const { result } = renderHook(useHoreb);
    const { encryptHoreb } = result.current;

    act(() => {
      expect(encryptHoreb("f")).toBe("52");
      expect(encryptHoreb("i")).toBe("109");
      expect(encryptHoreb("p")).toBe("123");
    });
  });

  test("should encrypt a single symbol character with default keys", () => {
    const { result } = renderHook(useHoreb);
    const { encryptHoreb } = result.current;

    act(() => {
      expect(encryptHoreb("#")).toBe("#");
      expect(encryptHoreb("&")).toBe("&");
      expect(encryptHoreb("$")).toBe("$");
      expect(encryptHoreb("@")).toBe("@");
      expect(encryptHoreb("(")).toBe("(");
      expect(encryptHoreb(")")).toBe(")");
    });
  });

  test("should mark result as verified after encryption", async () => {
    const { result } = renderHook(useHoreb);
    const { encryptHoreb } = result.current;

    act(() => {
      encryptHoreb(plainText);
    });

    await waitFor(() => {
      expect(result.current.isVerified).toBe(true);
    });
  });

  test("should output a cipher text that is not equal to the original text", async () => {
    const { result } = renderHook(useHoreb);
    const { encryptHoreb } = result.current;

    act(() => {
      expect(encryptHoreb(plainText)).not.toEqual(plainText);
    });
  });

  test("should output a cipher text that outputs an expected value", async () => {
    const { result } = renderHook(useHoreb);
    const { encryptHoreb } = result.current;

    act(() => {
      expect(removeAlphabeticCharacters(encryptHoreb(plainText))).toBe(
        removeAlphabeticCharacters(cipherText.defaultKey)
      );
    });
  });
});

// With updated keys
// key CUFEJ
describe("useHoreb: Encryption with updated keys", () => {
  test("should encrypt a single uppercase character with updated keys", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.encryptHoreb("C")).toBe("`304");
      expect(result.current.encryptHoreb("V")).toBe("`72");
      expect(result.current.encryptHoreb("L")).toBe("`260");
    });
  });

  test("should encrypt a single lowercase character with updated keys", () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.encryptHoreb("d")).toBe("6");
      expect(result.current.encryptHoreb("o")).toBe("105");
      expect(result.current.encryptHoreb("w")).toBe("145");
    });
  });

  test("should encrypt a single symbol character with updated keys", () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.encryptHoreb("#")).toBe("#");
      expect(result.current.encryptHoreb("&")).toBe("&");
      expect(result.current.encryptHoreb("$")).toBe("$");
      expect(result.current.encryptHoreb("@")).toBe("@");
      expect(result.current.encryptHoreb("(")).toBe("(");
      expect(result.current.encryptHoreb(")")).toBe(")");
    });
  });

  test("should mark result as verified after encryption with updated keys", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      result.current.encryptHoreb(plainText);
    });

    await waitFor(() => {
      expect(result.current.isVerified).toBe(true);
    });
  });

  test("should output a cipher text that is not equal to the original text", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.encryptHoreb(plainText)).not.toEqual(plainText);
    });
  });

  test("should output a cipher text that outputs an expected value", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(
        removeAlphabeticCharacters(result.current.encryptHoreb(plainText))
      ).toBe(removeAlphabeticCharacters(cipherText.updatedKey));
    });
  });
});

// DECRYPTION
describe("useHoreb: Decryption with default keys", () => {
  test("should decrypt a single uppercase character with default keys", () => {
    const { result } = renderHook(useHoreb);
    const { decryptHoreb } = result.current;

    act(() => {
      expect(decryptHoreb("`23")).toBe("A");
      expect(decryptHoreb("`83")).toBe("V");
      expect(decryptHoreb("`52")).toBe("F");
    });
  });

  test("should decrypt a single lowercase character with default keys", () => {
    const { result } = renderHook(useHoreb);
    const { decryptHoreb } = result.current;

    act(() => {
      expect(decryptHoreb("52")).toBe("f");
      expect(decryptHoreb("109")).toBe("i");
      expect(decryptHoreb("123")).toBe("p");
    });
  });

  test("should decrypt a single symbol character with default keys", () => {
    const { result } = renderHook(useHoreb);
    const { decryptHoreb } = result.current;

    act(() => {
      expect(decryptHoreb("#")).toBe("#");
      expect(decryptHoreb("&")).toBe("&");
      expect(decryptHoreb("$")).toBe("$");
      expect(decryptHoreb("@")).toBe("@");
      expect(decryptHoreb("(")).toBe("(");
      expect(decryptHoreb(")")).toBe(")");
    });
  });

  test("should mark result as verified after decryptioncharacter with default keys", async () => {
    const { result } = renderHook(useHoreb);
    const { decryptHoreb } = result.current;

    act(() => {
      decryptHoreb(cipherText.defaultKey);
    });

    await waitFor(() => {
      expect(result.current.isVerified).toBe(true);
    });
  });

  test("should output a cipher text that is not equal to the original text with default keys", async () => {
    const { result } = renderHook(useHoreb);
    const { decryptHoreb } = result.current;

    act(() => {
      expect(decryptHoreb(cipherText.defaultKey)).not.toEqual(
        cipherText.defaultKey
      );
    });
  });

  test("should output a cipher text that outputs an expected value with default keys", async () => {
    const { result } = renderHook(useHoreb);
    const { decryptHoreb } = result.current;

    act(() => {
      expect(decryptHoreb(cipherText.defaultKey)).toBe(plainText);
    });
  });
});

// With updated keys
// key CUFEJ
describe("useHoreb: Decryption with updated keys", () => {
  test("should decrypt a single uppercase character with updated keys", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.decryptHoreb("`7")).toBe("A");
      expect(result.current.decryptHoreb("`72")).toBe("V");
      expect(result.current.decryptHoreb("`1")).toBe("F");
    });
  });

  test("should decrypt a single lowercase character with updated keys", () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.decryptHoreb("6")).toBe("d");
      expect(result.current.decryptHoreb("105")).toBe("o");
      expect(result.current.decryptHoreb("145")).toBe("w");
    });
  });

  test("should decrypt a single symbol character with updated keys", () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.decryptHoreb("#")).toBe("#");
      expect(result.current.decryptHoreb("&")).toBe("&");
      expect(result.current.decryptHoreb("$")).toBe("$");
      expect(result.current.decryptHoreb("@")).toBe("@");
      expect(result.current.decryptHoreb("(")).toBe("(");
      expect(result.current.decryptHoreb(")")).toBe(")");
    });
  });

  test("should mark result as verified after decryption with updated keys", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      result.current.decryptHoreb(cipherText.updatedKey);
    });

    await waitFor(() => {
      expect(result.current.isVerified).toBe(true);
    });
  });

  test("should output a cipher text that is not equal to the original text with updated keys", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.decryptHoreb(cipherText.updatedKey)).not.toEqual(
        cipherText.updatedKey
      );
    });
  });

  test("should output a cipher text that outputs an expected value with updated keys", async () => {
    const { result } = renderHook(useHoreb);
    const {
      setRotationI,
      setRotationII,
      setRotationIII,
      setRotationIV,
      setRotationV,
    } = result.current;

    act(() => {
      setRotationI(2);
      setRotationII(7);
      setRotationIII(13);
      setRotationIV(2);
      setRotationV(18);
    });

    act(() => {
      expect(result.current.decryptHoreb(cipherText.updatedKey)).toBe(
        plainText
      );
    });
  });
});
