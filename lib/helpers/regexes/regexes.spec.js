import { replaceSecondGroupInContent } from "./regexes.js";

/**
 * simple test regex with 3 capture groups
 * (the second group matching everything from "BEG " to " END")
 */
const REPLACE_GROUPS_TEST_REGEX = /(.*BEG\s)(.*)(\sEND.*)/s;

describe("replaceSecondGroupInContent", () => {
  it("should replace the version part of a match", () => {
    expect(
      replaceSecondGroupInContent(`BEG 0.0.0-dev END`, "1.0.0", [
        REPLACE_GROUPS_TEST_REGEX,
      ]),
    ).toBe(`BEG 1.0.0 END`);
  });

  it("should preserve indentation and newline", () => {
    expect(
      replaceSecondGroupInContent(
        "\n  \n    BEG 0.0.0-dev END    \n  \n\n",
        "1.0.0",
        [REPLACE_GROUPS_TEST_REGEX],
      ),
    ).toBe("\n  \n    BEG 1.0.0 END    \n  \n\n");
  });

  it("should throw if no match is found", () => {
    expect(() =>
      replaceSecondGroupInContent("", "1.0.0", [REPLACE_GROUPS_TEST_REGEX]),
    ).toThrow();
  });
});
