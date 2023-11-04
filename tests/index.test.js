import { add } from "../lib/index";

describe("add", () => {
  it("should be defined", () => {
    expect(add).toBeDefined();
  });

  it("should sum up two numbers", () => {
    expect(add(42, 42)).toBe(84);
  });

  it("should sum up a list of numbers", () => {
    expect(add([42, 42])).toBe(84);
  });

  it("should throw for invalid inputs", () => {
    expect(() => add()).toThrow("Invalid input");
    expect(() => add(42)).toThrow("Invalid input");
  });
});
