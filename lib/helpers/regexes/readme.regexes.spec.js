import { createReadmeVersionRequirementRegexs } from "./readme.regexes.js";

/**
 * SPEC: https://github.com/talent-ideal/semantic-release-hex/issues/20
 */

describe("readmeVersionRegex", () => {
  it("should match the version requirement even without patch version", () => {
    const { readmeVersionRegex } =
      createReadmeVersionRequirementRegexs("test_package");

    expect(`{ :test_package, "~> 0.0" }`).toMatch(readmeVersionRegex);
    expect(`{ :test_package, "~> 0.0-dev" }`).toMatch(readmeVersionRegex);
    expect(`{ :test_package, "~> 0.0-dev+meta" }`).toMatch(readmeVersionRegex);
  });

  // eslint-disable-next-line jest/prefer-expect-assertions
  it("should match the various version requirements operators", () => {
    const { readmeVersionRegex } =
      createReadmeVersionRequirementRegexs("test_package");

    const operators = [">", ">=", "<", "<=", "==", "!=", "~>"];

    expect.assertions(operators.length);
    for (let operator of operators) {
      expect(`{ :test_package, "${operator} 0.0.0-dev" }`).toMatch(
        readmeVersionRegex,
      );
    }
  });

  // eslint-disable-next-line jest/prefer-expect-assertions
  it("should match the various dependencies specification format", () => {
    const { readmeVersionRegex } =
      createReadmeVersionRequirementRegexs("test_package");

    const formats = [
      '{:test_package, "~> 0.0.0-dev"}',
      '{:test_package, ">= 0.0.0-dev"}',
      '{:test_package, git: "https://github.com/test_package/test_package.git", tag: "0.0.0-dev"}',
    ];

    expect.assertions(formats.length);
    for (let format of formats) {
      expect(format).toMatch(readmeVersionRegex);
    }
  });
});
