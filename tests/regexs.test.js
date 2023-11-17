import {
  attributeVersionRegex,
  regularVersionRegex,
  semVerRegex,
} from "../lib/helpers/regexs";
import { invalidSemVers, validSemVers } from "./fixtures/regexs.fixture";

describe("semVerRegex", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length);

    for (let semVer of validSemVers) {
      expect(semVer).toMatch(new RegExp("^" + semVerRegex.source + "$"));
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(invalidSemVers.length);

    for (let semVer of invalidSemVers) {
      expect(semVer).not.toMatch(new RegExp("^" + semVerRegex.source + "$"));
    }
  });
});

describe("regularVersionRegex", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 3);

    for (let semVer of validSemVers) {
      expect(`version:"${semVer}"`).toMatch(regularVersionRegex);
      expect(` version: "${semVer}" ,`).toMatch(regularVersionRegex);
      expect(`  version:  "${semVer}"  ,`).toMatch(regularVersionRegex);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 5 + invalidSemVers.length);

    for (let semVer of validSemVers) {
      expect(`version: ${semVer}`).not.toMatch(regularVersionRegex);
      expect(`version "${semVer}"`).not.toMatch(regularVersionRegex);
      expect(`versin: "${semVer}",`).not.toMatch(regularVersionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(regularVersionRegex);
      expect(`tag: "${semVer}",`).not.toMatch(regularVersionRegex);
    }

    for (let semVer of invalidSemVers) {
      expect(`version: "${semVer}"`).not.toMatch(regularVersionRegex);
    }
  });
});

describe("attributeVersionRegex", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 3);

    for (let semVer of validSemVers) {
      expect(`@version "${semVer}"`).toMatch(attributeVersionRegex);
      expect(` @version "${semVer}"`).toMatch(attributeVersionRegex);
      expect(`  @version  "${semVer}"`).toMatch(attributeVersionRegex);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 5 + invalidSemVers.length);

    for (let semVer of validSemVers) {
      expect(`@version ${semVer}`).not.toMatch(attributeVersionRegex);
      expect(`@version"${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`@versin "${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`@tag "${semVer}"`).not.toMatch(attributeVersionRegex);
    }

    for (let semVer of invalidSemVers) {
      expect(`@version "${semVer}"`).not.toMatch(attributeVersionRegex);
    }
  });
});
