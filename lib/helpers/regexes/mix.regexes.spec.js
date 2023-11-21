import {
  invalidSemVers,
  validSemVers,
} from "../../../tests/fixtures/regexes.fixture.js";
import { createTestProject } from "../../../tests/helpers/create-test-project.js";
import { DEF_P_1, DEF_P_2 } from "../../../tests/helpers/test.constants.js";
import { mixVersionRegex, parseProjectName } from "./mix.regexes.js";

describe("parseProjectName", () => {
  it("should match and capture the project name", () => {
    const { content } = createTestProject("0.0.0-dev", null, "complex-name");

    expect(parseProjectName(content)).toBe("hello_world_@_42");
  });

  it("should should throw if no match is found", () => {
    expect(() => parseProjectName("")).toThrow();
  });
});

describe("mixVersionRegex", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 6);

    for (let semVer of validSemVers) {
      expect(`${DEF_P_1}version:"${semVer}"${DEF_P_2}`).toMatch(
        mixVersionRegex,
      );
      expect(`${DEF_P_1} version: "${semVer}" ,${DEF_P_2}`).toMatch(
        mixVersionRegex,
      );
      expect(`${DEF_P_1}  version:  "${semVer}"  ,${DEF_P_2}`).toMatch(
        mixVersionRegex,
      );

      expect(`@version "${semVer}"`).toMatch(mixVersionRegex);
      expect(` @version "${semVer}"`).toMatch(mixVersionRegex);
      expect(`  @version  "${semVer}"`).toMatch(mixVersionRegex);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 12 + invalidSemVers.length * 2);

    for (let semVer of validSemVers) {
      expect(`version:"${semVer}"`).not.toMatch(mixVersionRegex);
      expect(` version: "${semVer}" ,`).not.toMatch(mixVersionRegex);
      expect(`  version:  "${semVer}"  ,`).not.toMatch(mixVersionRegex);

      expect(`version: ${semVer}`).not.toMatch(mixVersionRegex);
      expect(`version "${semVer}"`).not.toMatch(mixVersionRegex);
      expect(`versin: "${semVer}",`).not.toMatch(mixVersionRegex);

      expect(`@version ${semVer}`).not.toMatch(mixVersionRegex);
      expect(`@version"${semVer}"`).not.toMatch(mixVersionRegex);
      expect(`@versin "${semVer}"`).not.toMatch(mixVersionRegex);

      expect(`@tag "${semVer}"`).not.toMatch(mixVersionRegex);
      expect(`tag: "${semVer}",`).not.toMatch(mixVersionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(mixVersionRegex);
    }

    for (let semVer of invalidSemVers) {
      expect(`${DEF_P_1}version: "${semVer}"${DEF_P_2}`).not.toMatch(
        mixVersionRegex,
      );

      expect(`@version "${semVer}"`).not.toMatch(mixVersionRegex);
    }
  });
});
