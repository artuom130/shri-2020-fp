import {
  validateFieldN1,
  validateFieldN2,
  validateFieldN3,
  validateFieldN4,
  validateFieldN5,
  validateFieldN6,
  validateFieldN7,
  validateFieldN8,
  validateFieldN9,
  validateFieldN10,
} from "./validators";

describe("validateFieldN1", () => {
  test.each([
    [{ star: "red", square: "green", circle: "white", triangle: "white" }, true],
    [{ star: "red", square: "green", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "white", triangle: "white" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN1(obj)).toBe(expected);
  });
});
describe("validateFieldN2", () => {
  test.each([
    [{ star: "green", square: "green", circle: "white", triangle: "white" }, true],
    [{ star: "red", square: "green", circle: "green", triangle: "green" }, true],
    [{ star: "red", square: "green", circle: "red", triangle: "red" }, false],
    [{ star: "white", square: "white", circle: "white", triangle: "white" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "white", triangle: "white" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN2(obj)).toBe(expected);
  });
});
describe("validateFieldN3", () => {
  test.each([
    [{ star: "red", square: "red", circle: "blue", triangle: "blue" }, true],
    [{ star: "red", square: "green", circle: "green", triangle: "blue" }, true],
    [{ star: "red", square: "blue", circle: "red", triangle: "red" }, false],
    [{ star: "blue", square: "white", circle: "white", triangle: "white" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "blue", triangle: "white" }, false],
    [{ star: "red", square: "blue", circle: "red", triangle: "white" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN3(obj)).toBe(expected);
  });
});
describe("validateFieldN4", () => {
  test.each([
    [{ star: "red", square: "orange", circle: "blue", triangle: "red" }, true],
    [{ star: "red", square: "green", circle: "green", triangle: "blue" }, false],
    [{ star: "red", square: "blue", circle: "red", triangle: "red" }, false],
    [{ star: "blue", square: "white", circle: "white", triangle: "white" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "blue", triangle: "white" }, false],
    [{ star: "red", square: "blue", circle: "red", triangle: "white" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN4(obj)).toBe(expected);
  });
});
describe("validateFieldN5", () => {
  test.each([
    [{ star: "red", square: "red", circle: "blue", triangle: "red" }, true],
    [{ star: "blue", square: "blue", circle: "blue", triangle: "red" }, true],
    [{ star: "blue", square: "orange", circle: "orange", triangle: "orange" }, true],
    [{ star: "green", square: "orange", circle: "green", triangle: "green" }, true],
    [{ star: "blue", square: "white", circle: "white", triangle: "white" }, false],
    [{ star: "blue", square: "white", circle: "white", triangle: "white" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "blue", triangle: "white" }, false],
    [{ star: "red", square: "blue", circle: "red", triangle: "white" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN5(obj)).toBe(expected);
  });
});
describe("validateFieldN6", () => {
  test.each([
    [{ star: "green", square: "red", circle: "blue", triangle: "green" }, true],
    [{ star: "blue", square: "red", circle: "green", triangle: "green" }, true],
    [{ star: "red", square: "blue", circle: "green", triangle: "green" }, true],
    [{ star: "red", square: "green", circle: "green", triangle: "white" }, false],
    [{ star: "white", square: "green", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "blue", triangle: "green" }, false],
    [{ star: "red", square: "blue", circle: "red", triangle: "white" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN6(obj)).toBe(expected);
  });
});
describe("validateFieldN7", () => {
  test.each([
    [{ star: "orange", square: "orange", circle: "orange", triangle: "orange" }, true],
    [{ star: "red", square: "green", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "green", circle: "white", triangle: "green" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN7(obj)).toBe(expected);
  });
});
describe("validateFieldN8", () => {
  test.each([
    [{ star: "orange", square: "orange", circle: "orange", triangle: "orange" }, true],
    [{ star: "blue", square: "green", circle: "white", triangle: "green" }, true],
    [{ star: "green", square: "green", circle: "white", triangle: "green" }, true],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "white", square: "green", circle: "white", triangle: "green" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN8(obj)).toBe(expected);
  });
});
describe("validateFieldN9", () => {
  test.each([
    [{ star: "green", square: "green", circle: "green", triangle: "green" }, true],
    [{ star: "red", square: "green", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "green" }, false],
    [{ star: "red", square: "green", circle: "white", triangle: "green" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN9(obj)).toBe(expected);
  });
});
describe("validateFieldN10", () => {
  test.each([
    [{ star: "red", square: "green", circle: "red", triangle: "green" }, true],
    [{ star: "red", square: "red", circle: "red", triangle: "red" }, true],
    [{ star: "red", square: "blue", circle: "red", triangle: "blue" }, true],
    [{ star: "red", square: "orange", circle: "red", triangle: "orange" }, true],
    [{ star: "red", square: "white", circle: "white", triangle: "white" }, false],
    [{ star: "red", square: "blue", circle: "blue", triangle: "green" }, false],
    [{ star: "red", square: "white", circle: "white", triangle: "blue" }, false],
  ])("For object %s returns %s", (obj, expected) => {
    expect(validateFieldN10(obj)).toBe(expected);
  });
});
