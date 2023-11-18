import {
  invalidSemVers,
  validSemVers,
} from "../../tests/fixtures/regexes.fixture";
import { semVerRegexLine, versionRegex } from "./regexes";

describe("semVerRegexLine", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length);

    for (let semVer of validSemVers) {
      expect(semVer).toMatch(semVerRegexLine);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(invalidSemVers.length);

    for (let semVer of invalidSemVers) {
      expect(semVer).not.toMatch(semVerRegexLine);
    }
  });
});

describe("versionRegex", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 6);

    for (let semVer of validSemVers) {
      expect(`version:"${semVer}"`).toMatch(versionRegex);
      expect(` version: "${semVer}" ,`).toMatch(versionRegex);
      expect(`  version:  "${semVer}"  ,`).toMatch(versionRegex);

      expect(`@version "${semVer}"`).toMatch(versionRegex);
      expect(` @version "${semVer}"`).toMatch(versionRegex);
      expect(`  @version  "${semVer}"`).toMatch(versionRegex);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 10 + invalidSemVers.length * 2);

    for (let semVer of validSemVers) {
      expect(`version: ${semVer}`).not.toMatch(versionRegex);
      expect(`version "${semVer}"`).not.toMatch(versionRegex);
      expect(`versin: "${semVer}",`).not.toMatch(versionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(versionRegex);
      expect(`tag: "${semVer}",`).not.toMatch(versionRegex);

      expect(`@version ${semVer}`).not.toMatch(versionRegex);
      expect(`@version"${semVer}"`).not.toMatch(versionRegex);
      expect(`@versin "${semVer}"`).not.toMatch(versionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(versionRegex);
      expect(`@tag "${semVer}"`).not.toMatch(versionRegex);
    }

    for (let semVer of invalidSemVers) {
      expect(`version: "${semVer}"`).not.toMatch(versionRegex);

      expect(`@version "${semVer}"`).not.toMatch(versionRegex);
    }
  });
});
