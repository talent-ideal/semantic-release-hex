import {
  invalidSemVers,
  validSemVers,
} from "../../tests/fixtures/regexes.fixture.js";
import { DEF_P_1, DEF_P_2 } from "../../tests/helpers/test.constants.js";
import { replaceVersionInContent, versionRegex } from "./regexes.js";

describe("replaceVersionInContent", () => {
  it("should replace the version part of a match", () => {
    expect(
      replaceVersionInContent(
        `${DEF_P_1}version: "0.0.0-dev"${DEF_P_2}`,
        "1.0.0",
      ),
    ).toBe(`${DEF_P_1}version: "1.0.0"${DEF_P_2}`);

    expect(replaceVersionInContent('@version "0.0.0-dev"', "1.0.0")).toBe(
      '@version "1.0.0"',
    );
  });

  it("should not replace the version outside of the project definition", () => {
    expect(() =>
      replaceVersionInContent('version: "0.0.0-dev"', "1.0.0"),
    ).toThrow();
  });

  it("should preserve indentation and newline", () => {
    expect(
      replaceVersionInContent(
        `\n  ${DEF_P_1}\n    version: "0.0.0-dev"\n  ${DEF_P_2}  \n`,
        "1.0.0",
      ),
    ).toBe(`\n  ${DEF_P_1}\n    version: "1.0.0"\n  ${DEF_P_2}  \n`);

    expect(
      replaceVersionInContent('\n  @version "0.0.0-dev"  \n', "1.0.0"),
    ).toBe('\n  @version "1.0.0"  \n');
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
      expect(`${DEF_P_1}version:"${semVer}"${DEF_P_2}`).toMatch(versionRegex);
      expect(`${DEF_P_1} version: "${semVer}" ,${DEF_P_2}`).toMatch(
        versionRegex,
      );
      expect(`${DEF_P_1}  version:  "${semVer}"  ,${DEF_P_2}`).toMatch(
        versionRegex,
      );

      expect(`@version "${semVer}"`).toMatch(versionRegex);
      expect(` @version "${semVer}"`).toMatch(versionRegex);
      expect(`  @version  "${semVer}"`).toMatch(versionRegex);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 12 + invalidSemVers.length * 2);

    for (let semVer of validSemVers) {
      expect(`version:"${semVer}"`).not.toMatch(versionRegex);
      expect(` version: "${semVer}" ,`).not.toMatch(versionRegex);
      expect(`  version:  "${semVer}"  ,`).not.toMatch(versionRegex);

      expect(`version: ${semVer}`).not.toMatch(versionRegex);
      expect(`version "${semVer}"`).not.toMatch(versionRegex);
      expect(`versin: "${semVer}",`).not.toMatch(versionRegex);

      expect(`@version ${semVer}`).not.toMatch(versionRegex);
      expect(`@version"${semVer}"`).not.toMatch(versionRegex);
      expect(`@versin "${semVer}"`).not.toMatch(versionRegex);

      expect(`@tag "${semVer}"`).not.toMatch(versionRegex);
      expect(`tag: "${semVer}",`).not.toMatch(versionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(versionRegex);
    }

    for (let semVer of invalidSemVers) {
      expect(`${DEF_P_1}version: "${semVer}"${DEF_P_2}`).not.toMatch(
        versionRegex,
      );

      expect(`@version "${semVer}"`).not.toMatch(versionRegex);
    }
  });
});
