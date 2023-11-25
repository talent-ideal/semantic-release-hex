import { validSemVers } from "../../../tests/fixtures/regexes.fixture.js";
import { createReadmeVersionRequirementRegexs } from "./readme.regexes.js";

/**
 * SPEC: https://github.com/talent-ideal/semantic-release-hex/issues/20
 */

describe("readmeVersionRegex", () => {
  it("should match the version requirement even without patch version", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length);

    const { readmeVersionRegex } =
      createReadmeVersionRequirementRegexs("test_package");

    for (let fullSemVer of validSemVers) {
      // remove the patch version from valid SemVers
      let i = 0;
      const semVer = fullSemVer.replace(/\.\d+/g, (match) =>
        ++i === 2 ? "" : match,
      );

      expect(`{ :test_package, "~> ${semVer}" }`).toMatch(readmeVersionRegex);
    }
  });

  // eslint-disable-next-line jest/prefer-expect-assertions
  it("should match the various version requirements operators", () => {
    const { readmeVersionRegex } =
      createReadmeVersionRequirementRegexs("test_package");

    const operators = ["", ">", ">=", "<", "<=", "==", "!=", "~>"];

    expect.assertions(validSemVers.length * operators.length);
    for (let semVer of validSemVers) {
      for (let operator of operators) {
        expect(`{ :test_package, "${operator} ${semVer}" }`).toMatch(
          readmeVersionRegex,
        );
      }
    }
  });

  // eslint-disable-next-line jest/prefer-expect-assertions
  it("should match the various dependencies specification format", () => {
    const { readmeVersionRegex } =
      createReadmeVersionRequirementRegexs("test_package");

    expect.assertions(validSemVers.length * 3);
    for (let semVer of validSemVers) {
      const formats = [
        `{:test_package, "~> ${semVer}"}`,
        `{:test_package, ">= ${semVer}"}`,
        `{:test_package, git: "https://github.com/test_package/test_package.git", tag: "v${semVer}"}`,
      ];

      for (let format of formats) {
        expect(format).toMatch(readmeVersionRegex);
      }
    }
  });
});
