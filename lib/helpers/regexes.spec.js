import {
  invalidSemVers,
  validSemVers,
} from "../../tests/fixtures/regexes.fixture.js";
import { replaceVersionInContent, versionRegex } from "./regexes.js";

describe("replaceVersionInContent", () => {
  it("should replace the version part of a match", () => {
    expect(replaceVersionInContent(`version: "0.0.0-dev"`, "1.0.0")).toBe(
      `version: "1.0.0"`,
    );
    expect(replaceVersionInContent(`@version "0.0.0-dev"`, "1.0.0")).toBe(
      `@version "1.0.0"`,
    );
  });

  it("should preserve indentation and newline", () => {
    expect(
      replaceVersionInContent(`\n  version: "0.0.0-dev"  \n`, "1.0.0"),
    ).toBe(`\n  version: "1.0.0"  \n`);
    expect(
      replaceVersionInContent(`\n  @version "0.0.0-dev"  \n`, "1.0.0"),
    ).toBe(`\n  @version "1.0.0"  \n`);
  });

  it("should throw if no match is found", () => {
    expect(() => replaceVersionInContent("", "1.0.0")).toThrow();
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
