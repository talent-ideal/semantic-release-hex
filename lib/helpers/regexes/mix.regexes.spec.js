import {
  invalidSemVers,
  validSemVers,
} from "../../../tests/fixtures/regexes.fixture.js";
import { DEF_P_1, DEF_P_2 } from "../../../tests/helpers/test.constants.js";
import { mixVersionRegex } from "./mix.regexes.js";

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
