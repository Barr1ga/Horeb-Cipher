import {
  isAlphabet,
  isNumeric,
  isSpecialCharacter,
  isUpperCase,
} from "../../utils/alphabet";

describe("isNumeric", () => {
  it("should return true for numeric characters", () => {
    expect(isNumeric("0")).toBe(true);
    expect(isNumeric("1")).toBe(true);
    expect(isNumeric("9")).toBe(true);
  });

  it("should return false for non-numeric characters", () => {
    expect(isNumeric("a")).toBe(false);
    expect(isNumeric(" ")).toBe(false);
    expect(isNumeric("!")).toBe(false);
  });
});

describe("isAlphabet", () => {
  test("should return true for alphabetic characters", () => {
    expect(isAlphabet("a")).toBe(true);
    expect(isAlphabet("Z")).toBe(true);
    expect(isAlphabet("f")).toBe(true);
  });

  test("should return false for non-alphabetic characters", () => {
    expect(isAlphabet("1")).toBe(false);
    expect(isAlphabet("!")).toBe(false);
    expect(isAlphabet("@")).toBe(false);
  });
});

describe("isUpperCase", () => {
  test("should return true for uppercase characters", () => {
    expect(isUpperCase("A")).toBe(true);
    expect(isUpperCase("Z")).toBe(true);
  });

  test("should return false for non-uppercase characters", () => {
    expect(isUpperCase("a")).toBe(false);
    expect(isUpperCase("1")).toBe(false);
    expect(isUpperCase("!")).toBe(false);
  });
});

describe("isSpecialCharacter", () => {
  test("should return true for special characters", () => {
    expect(isSpecialCharacter("!")).toBe(true);
    expect(isSpecialCharacter("@")).toBe(true);
    expect(isSpecialCharacter("#")).toBe(true);
  });

  test("should return false for non-special characters", () => {
    expect(isSpecialCharacter("a")).toBe(false);
    expect(isSpecialCharacter("1")).toBe(false);
    expect(isSpecialCharacter("A")).toBe(false);
  });
});
